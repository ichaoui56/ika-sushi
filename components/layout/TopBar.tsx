import Link from "next/link";

export function TopBar() {
  const tickerItems = [
    "Fresh sushi, made to order",
    "A taste of the coast",
    "Your table is waiting",
  ];
  const renderTickerTrack = () => (
    <div className="Ika-header-ticker-track">
      {[false, true].map((isDuplicate) => (
        <div
          className="Ika-header-ticker-group"
          aria-hidden={isDuplicate || undefined}
          key={String(isDuplicate)}
        >
          {tickerItems.map((item) => (
            <span className="Ika-header-ticker-item" key={item}>
              <i className="fas fa-star" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="Ika-utility-bar">
        <div className="Ika-utility-inner">
          <nav className="Ika-utility-social" aria-label="Social media">
            <a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f" aria-hidden="true" />
            </a>
            <a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram" aria-hidden="true" />
            </a>
            <a href="https://www.youtube.com/" aria-label="YouTube" target="_blank" rel="noreferrer">
              <i className="fab fa-youtube" aria-hidden="true" />
            </a>
          </nav>
          <div className="Ika-utility-ticker" role="region" aria-label="Restaurant highlights">
            {renderTickerTrack()}
          </div>
          <div className="Ika-utility-contact">
            <a href="tel:+212521472481">
              <i className="fas fa-phone-alt" aria-hidden="true" />
              
              <span dir="ltr">05 21 47 24 81</span>
            </a>
            <a
              className="Ika-utility-whatsapp"
              href="https://wa.me/212632933941"
              aria-label="Message us on WhatsApp"
              title="Message us on WhatsApp"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-whatsapp" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
      <div className="Ika-header-ticker" role="region" aria-label="Restaurant highlights">
        {renderTickerTrack()}
      </div>
    </>
  );
}
