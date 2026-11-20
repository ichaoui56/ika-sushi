"use client";

import { useLocale } from "../i18n/LocaleProvider";
import type { OpeningHours } from "../../features/settings/schemas";

const messages = {
  fr: {
    title: "Nous sommes fermés pour le moment",
    body: "Notre équipe n'est pas en service actuellement. Nous serons ravis de vous accueillir pendant nos horaires d'ouverture.",
    mural: "À TRÈS BIENTÔT",
    imageAlt: "Assortiment de sushis",
    hours: "Horaires d'ouverture",
    unavailable: "Horaires momentanément indisponibles",
    closed: "Fermé",
    languages: "Langue",
    days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
  },
  en: {
    title: "We are closed right now",
    body: "Our team is currently off shift. We look forward to welcoming you during our opening hours.",
    mural: "BACK AT THE TABLE SOON",
    imageAlt: "Assorted sushi selection",
    hours: "Opening hours",
    unavailable: "Hours are temporarily unavailable",
    closed: "Closed",
    languages: "Language",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  ar: {
    title: "نحن مغلقون حاليا",
    body: "فريقنا غير متاح للعمل في الوقت الحالي. يسعدنا استقبالكم خلال ساعات العمل.",
    mural: "نعود قريبا",
    imageAlt: "تشكيلة من السوشي",
    hours: "ساعات العمل",
    unavailable: "ساعات العمل غير متاحة مؤقتا",
    closed: "مغلق",
    languages: "اللغة",
    days: ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],
  },
} as const;

const dayKeys: Array<keyof OpeningHours["days"]> = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export default function ClosedNotice({ openingHours }: { openingHours: OpeningHours }) {
  const { locale, setLocale } = useLocale();
  const copy = messages[locale];

  return (
    <main className={`Ika-closed-page${locale === "ar" ? " is-arabic" : ""}`} lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <header className="Ika-closed-topbar">
        <a href="/closed" aria-label="IKA Sushi"><img src="/white-logo.png" alt="IKA Sushi" /></a>
        <nav className="Ika-closed-languages" aria-label={copy.languages}>
          {(["fr", "en", "ar"] as const).map((language) => <button key={language} type="button" lang={language} aria-pressed={locale === language} onClick={() => setLocale(language)}>{language.toUpperCase()}</button>)}
        </nav>
      </header>

      <section className="Ika-closed-layout" aria-labelledby="Ika-closed-title">
        <div className="Ika-closed-visual">
          <div className="Ika-closed-visual-top"><span>IKA SUSHI</span><span>CASABLANCA · 01</span></div>
          <p className="Ika-closed-mural">{copy.mural}</p>
          <img src="/assets/img/shop/Shushi.png" alt={copy.imageAlt} />
          <span className="Ika-closed-visual-caption">SUSHI · SEAFOOD · GOOD COMPANY</span>
        </div>
        <div className="Ika-closed-main">
          <p className="Ika-closed-eyebrow"><i className="far fa-clock" aria-hidden="true" /> IKA SUSHI · {copy.hours}</p>
          <h1 id="Ika-closed-title">{copy.title}</h1>
          <p className="Ika-closed-copy">{copy.body}</p>
          <div className="Ika-closed-hours">
            <div className="Ika-closed-hours-heading"><h2>{copy.hours}</h2><span>CASABLANCA</span></div>
            {openingHours.enabled ? <dl>{dayKeys.map((key, index) => {
              const day = openingHours.days[key];
              return <div key={key}><dt>{copy.days[index]}</dt><dd>{day.open ? `${day.start} – ${day.end}` : copy.closed}</dd></div>;
            })}</dl> : <p>{copy.unavailable}</p>}
          </div>
        </div>
      </section>
      <footer className="Ika-closed-footer">IKA SUSHI · CASABLANCA</footer>
    </main>
  );
}