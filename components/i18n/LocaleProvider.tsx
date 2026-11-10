"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { translate, type Locale } from "./translations";

const STORAGE_KEY = "foodu-locale";
const supportedLocales: Locale[] = ["fr", "en", "ar"];
const textSources = new WeakMap<Text, { source: string; rendered: string }>();
const attributeSources = new WeakMap<
  Element,
  Map<string, { source: string; rendered: string }>
>();

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value !== null && supportedLocales.includes(value as Locale);
}

function localizeDocument(locale: Locale) {
  const translatableAttributes = ["aria-label", "title", "alt", "placeholder"];

  const localizeText = (node: Text) => {
    let entry = textSources.get(node);
    if (!entry || node.data !== entry.rendered) {
      entry = { source: node.data, rendered: node.data };
      textSources.set(node, entry);
    }
    const translated = translate(entry.source, locale);
    if (node.data !== translated) node.data = translated;
    entry.rendered = translated;
  };

  const localizeAttributes = (element: Element) => {
    let values = attributeSources.get(element);
    if (!values) {
      values = new Map();
      attributeSources.set(element, values);
    }
    for (const attribute of translatableAttributes) {
      const current = element.getAttribute(attribute);
      if (current === null) continue;
      let entry = values.get(attribute);
      if (!entry || current !== entry.rendered) {
        entry = { source: current, rendered: current };
        values.set(attribute, entry);
      }
      const translated = translate(entry.source, locale);
      if (current !== translated) element.setAttribute(attribute, translated);
      entry.rendered = translated;
    }
  };

  const localizeTree = (root: Node) => {
    if (root instanceof Text) {
      localizeText(root);
      return;
    }
    if (root instanceof Element) {
      if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(root.tagName)) return;
      localizeAttributes(root);
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      if (node.parentElement && !["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.parentElement.tagName)) {
        localizeText(node as Text);
      }
      node = walker.nextNode();
    }
    if (root instanceof Element) {
      root.querySelectorAll("*").forEach(localizeAttributes);
    }
  };

  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  localizeTree(document.documentElement);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(localizeTree);
      } else if (mutation.type === "characterData" && mutation.target instanceof Text) {
        localizeText(mutation.target);
      } else if (mutation.type === "attributes" && mutation.target instanceof Element) {
        localizeAttributes(mutation.target);
      }
    }
  });
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: translatableAttributes,
  });
  return () => observer.disconnect();
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    } catch (error) {
      console.error("Could not save the selected language.", error);
    }
  }, []);

  useEffect(() => {
    try {
      const savedLocale = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(savedLocale)) setLocaleState(savedLocale);
    } catch (error) {
      console.error("Could not read the saved language.", error);
    }
  }, []);

  useEffect(() => {
    const cleanup = localizeDocument(locale);
    document.dispatchEvent(new CustomEvent("foodu:locale-change", { detail: { locale } }));
    return cleanup;
  }, [locale]);

  const context = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);
  return <LocaleContext.Provider value={context}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider.");
  return context;
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const languages: Array<{ locale: Locale; name: string; flag: string }> = [
    { locale: "fr", name: "Français", flag: "🇫🇷" },
    { locale: "en", name: "English", flag: "🇬🇧" },
    { locale: "ar", name: "العربية", flag: "🇸🇦" },
  ];
  const selectedLanguage = languages.find((language) => language.locale === locale)!;

  useEffect(() => {
    if (!isOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!switcherRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [isOpen]);

  const chooseLanguage = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = languages.length - 1;
    let nextIndex: number | undefined;
    if (event.key === "ArrowDown") nextIndex = index === lastIndex ? 0 : index + 1;
    if (event.key === "ArrowUp") nextIndex = index === 0 ? lastIndex : index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = lastIndex;
    if (nextIndex !== undefined) {
      event.preventDefault();
      optionRefs.current[nextIndex]?.focus();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div className="foodu-language-switcher" ref={switcherRef}>
      <button
        ref={triggerRef}
        className="foodu-language-trigger"
        type="button"
        aria-label={`Language: ${selectedLanguage.name}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setIsOpen(true);
            requestAnimationFrame(() => optionRefs.current[0]?.focus());
          } else if (event.key === "Escape") {
            setIsOpen(false);
          }
        }}
      >
        <span className="foodu-language-flag" aria-hidden="true">{selectedLanguage.flag}</span>
        <span className="foodu-language-current">{selectedLanguage.name}</span>
        <i
          className={`fas fa-chevron-down foodu-language-chevron${isOpen ? " is-open" : ""}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="foodu-language-menu" role="menu" aria-label="Choose a language">
          {languages.map((language, index) => (
            <button
              key={language.locale}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              className={`foodu-language-option${language.locale === locale ? " is-selected" : ""}`}
              type="button"
              role="menuitemradio"
              aria-checked={language.locale === locale}
              lang={language.locale}
              onClick={() => chooseLanguage(language.locale)}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
            >
              <span className="foodu-language-option-flag" aria-hidden="true">
                {language.flag}
              </span>
              <span className="foodu-language-option-name">{language.name}</span>
              {language.locale === locale && (
                <i className="fas fa-check foodu-language-option-check" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
