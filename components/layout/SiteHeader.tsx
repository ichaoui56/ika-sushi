"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../store/StoreProvider";
import { LanguageSwitcher } from "../i18n/LocaleProvider";

const links = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/food-menu" },
  { label: "Orders", href: "/orders" },
  { label: "About us", href: "/about-us" },
  { label: "Contact us", href: "/contact" },
];

function CountBadge({
  count,
  ready = true,
  animateOnIncrease = false,
}: {
  count: number;
  ready?: boolean;
  animateOnIncrease?: boolean;
}) {
  const [isPopping, setIsPopping] = useState(false);
  const previousCountRef = useRef(count);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!ready) {
      previousCountRef.current = count;
      return;
    }
    let timer: number | null = null;
    if (animateOnIncrease && hasLoadedRef.current && count > previousCountRef.current) {
      setIsPopping(true);
      timer = window.setTimeout(() => setIsPopping(false), 620);
    } else if (count <= previousCountRef.current) {
      setIsPopping(false);
    }
    previousCountRef.current = count;
    hasLoadedRef.current = true;
    return () => {
      if (timer !== null) window.clearTimeout(timer);
    };
  }, [animateOnIncrease, count, ready]);

  if (count === 0) return null;
  return (
    <span className={`foodu-count-badge${isPopping ? " is-popping" : ""}`}>
      {count > 99 ? "99+" : count}
    </span>
  );
}

function ThemeModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try {
      const savedMode = window.localStorage.getItem("foodu-color-mode");
      const isDark = savedMode
        ? savedMode === "dark"
        : document.body.classList.contains("bg-dark-secondary");
      document.body.classList.toggle("bg-dark-secondary", isDark);
      setDarkMode(isDark);
    } catch (error) {
      console.error("Could not read the saved color mode.", error);
      setDarkMode(document.body.classList.contains("bg-dark-secondary"));
    }
  }, []);

  const toggleTheme = () => {
    const nextDarkMode = !darkMode;
    document.body.classList.toggle("bg-dark-secondary", nextDarkMode);
    setDarkMode(nextDarkMode);
    try {
      window.localStorage.setItem("foodu-color-mode", nextDarkMode ? "dark" : "light");
    } catch (error) {
      console.error("Could not save the selected color mode.", error);
    }
  };

  return (
    <button
      className="foodu-theme-toggle"
      type="button"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={darkMode}
      onClick={toggleTheme}
    >
      <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`} aria-hidden="true" />
    </button>
  );
}

export function SiteHeader() {
  const { cartCount, wishlistCount, error, ready } = useStore();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("foodu-menu-open", menuOpen);
    return () => document.body.classList.remove("foodu-menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const isPrimaryLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={`foodu-header${scrolled ? " is-scrolled" : ""}${
          menuOpen ? " is-menu-open" : ""
        }`}
      >
        <div className="foodu-header-inner">
          <div className="foodu-header-primary">
            <Link className="foodu-brand" href="/" aria-label="IKA SUSHI home">
              <img src="/logo.png" alt="IKA SUSHI" />
            </Link>
            <nav className="foodu-desktop-nav" aria-label="Main navigation">
              {links.map((link) => {
                const active = isPrimaryLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={active ? "is-active" : undefined}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="foodu-header-controls">
            <div className="foodu-header-actions">
              <LanguageSwitcher />

              <Link
                className="foodu-icon-link"
                href="/login"
                aria-label="Account"
                title="Account"
              >
                <i className="far fa-user" aria-hidden="true" />
              </Link>
              <Link
                className="foodu-icon-link foodu-desktop-cart"
                href="/cart"
                aria-label={`Cart, ${cartCount} items`}
                title="Cart"
                onClick={(event) => {
                  event.preventDefault();
                  window.dispatchEvent(new Event("foodu:open-cart-drawer"));
                }}
              >
                <i className="far fa-shopping-bag" aria-hidden="true" />
                <CountBadge count={cartCount} />
              </Link>
              <Link
                className="foodu-icon-link foodu-header-wishlist"
                href="/wishlist"
                aria-label={`Wishlist, ${wishlistCount} items`}
                title="Wishlist"
              >
                <i className="far fa-heart" aria-hidden="true" />
                <CountBadge count={wishlistCount} />
              </Link>
            </div>
            <button
              className={`foodu-menu-toggle${menuOpen ? " is-open" : ""}`}
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="foodu-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`foodu-mobile-menu${menuOpen ? " is-open" : ""}`}
        id="foodu-mobile-menu"
        aria-hidden={!menuOpen}
      >
        <div className="foodu-mobile-menu-top">
          <span className="foodu-mobile-eyebrow">Good food, good mood</span>
          <span className="foodu-mobile-mark">FOODU</span>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => {
            const active = isPrimaryLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
                style={{ "--menu-index": index } as CSSProperties}
              >
                <span className="foodu-mobile-link-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{link.label}</span>
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </Link>
            );
          })}
        </nav>
        <div className="foodu-mobile-shortcuts">
          <Link
            href="/wishlist"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            <i className="far fa-heart" aria-hidden="true" />
            Wishlist <CountBadge count={wishlistCount} />
          </Link>
          <Link href="/login" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
            <i className="far fa-user" aria-hidden="true" />
            My account
          </Link>
          <Link href="/cart" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
            <i className="far fa-shopping-bag" aria-hidden="true" />
            Cart <CountBadge count={cartCount} />
          </Link>
        </div>
        <div className="foodu-mobile-language">
          <LanguageSwitcher />
        </div>
        <p className="foodu-mobile-tagline">Made fresh. Shared with love.</p>
      </div>
      {menuOpen && (
        <button
          type="button"
          className="foodu-menu-scrim"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}

      <nav className="foodu-bottom-nav" aria-label="Quick navigation">
        <Link
          href="/"
          aria-label="Home"
          className={pathname === "/" ? "is-active" : ""}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <i className="fas fa-home" aria-hidden="true" />
          <span>Home</span>
        </Link>
        <Link
          href="/food-menu"
          aria-label="Menu"
          className={pathname.startsWith("/food-menu") ? "is-active" : ""}
          aria-current={pathname.startsWith("/food-menu") ? "page" : undefined}
        >
          <i className="fas fa-utensils" aria-hidden="true" />
          <span>Menu</span>
        </Link>
        <Link
          className={`foodu-bottom-cart${pathname === "/cart" ? " is-active" : ""}`}
          href="/cart"
          aria-label={`Cart, ${cartCount} items`}
          aria-current={pathname === "/cart" ? "page" : undefined}
          onClick={(event) => {
            event.preventDefault();
            window.dispatchEvent(new Event("foodu:open-cart-drawer"));
          }}
        >
          <i className="fas fa-shopping-bag" aria-hidden="true" />
          <CountBadge count={cartCount} ready={ready} animateOnIncrease />
          <span>Cart</span>
        </Link>
        <Link
          href="/orders"
          aria-label="Orders"
          className={pathname.startsWith("/orders") ? "is-active" : ""}
          aria-current={pathname.startsWith("/orders") ? "page" : undefined}
        >
          <i className="fas fa-receipt" aria-hidden="true" />
          <span>Orders</span>
        </Link>
        <Link
          href="/login"
          aria-label="Account"
          className={["/login", "/register"].includes(pathname) ? "is-active" : ""}
          aria-current={["/login", "/register"].includes(pathname) ? "page" : undefined}
        >
          <i className="far fa-user" aria-hidden="true" />
          <span>Account</span>
        </Link>
      </nav>

      {!menuOpen && (
        <a
          className="foodu-floating-whatsapp"
          href="https://wa.me/212632933941"
          aria-label="Message us on WhatsApp"
          title="Message us on WhatsApp"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-whatsapp" aria-hidden="true" />
        </a>
      )}

      {scrolled && !menuOpen && (
        <button
          className="foodu-back-to-top"
          type="button"
          aria-label="Back to top"
          title="Back to top"
          onClick={() =>
            document.documentElement.scrollIntoView({
              block: "start",
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            })
          }
        >
          <i className="fas fa-arrow-up" aria-hidden="true" />
        </button>
      )}

      {error && (
        <div className="foodu-store-error" role="alert">
          Saved cart unavailable: {error}
        </div>
      )}
      {!ready && (
        <span className="foodu-store-loading" aria-live="polite">
          Loading saved items…
        </span>
      )}
    </>
  );
}
