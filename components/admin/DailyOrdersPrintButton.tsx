"use client";

type DailyReport = {
  orderCount: number;
  orderValueMinor: number;
  sentOrders: number;
  sentValueMinor: number;
  deliveredOrders: number;
  deliveredValueMinor: number;
};

const formatMoney = (minor: number) => new Intl.NumberFormat("fr-MA", { style: "currency", currency: "MAD", maximumFractionDigits: 0 }).format(minor / 100);
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[character] ?? character);

function dailyReportHtml(date: Date, report: DailyReport) {
  const dateLabel = date.toLocaleDateString("fr-MA", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const totals = [
    { label: "Envoyées en livraison", count: report.sentOrders, amount: report.sentValueMinor },
    { label: "Commandes livrées", count: report.deliveredOrders, amount: report.deliveredValueMinor },
  ];
  const totalAmount = formatMoney(report.orderValueMinor);
  const summaryRows = totals.map((row) => `<tr><th>${escapeHtml(row.label)}</th><td>${row.count}</td><td>${escapeHtml(formatMoney(row.amount))}</td></tr>`).join("");

  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rapport du ${escapeHtml(dateLabel)}</title><style>
    @page{size:80mm auto;margin:2mm}*{box-sizing:border-box}body{width:76mm;margin:0 auto;color:#171717;font:11px/1.35 Arial,sans-serif}header{text-align:center;padding:0 0 9px;border-bottom:1px dashed #555}header img{display:block;width:auto;max-width:44mm;max-height:18mm;margin:0 auto 5px}header h1{margin:0;font-size:15px}header p{margin:3px 0;color:#555}.range{font-weight:bold}.summary{padding:9px 0}.summary h2{margin:0 0 8px;font-size:12px;text-align:center}.transactions{padding:7px 0;border-bottom:1px solid #222;text-align:center}.transactions strong{display:block;font-size:16px}.transactions span{color:#555;font-size:10px}.summary table{width:100%;border-collapse:collapse}.summary th,.summary td{padding:6px 2px;border-bottom:1px dotted #aaa}.summary th{text-align:left;font-weight:normal}.summary td{text-align:right;white-space:nowrap}.summary thead th{font-size:9px;font-weight:bold}.grand-total{padding:8px 0;border-top:1px dashed #555;border-bottom:1px dashed #555;text-align:center;font-size:14px;font-weight:bold}.note{margin:8px 0;color:#555;font-size:9px;text-align:center}.thanks{padding:8px 0;text-align:center;font-weight:bold}@media print{body{width:auto}}
    </style></head><body><header><img src="/logo.png" alt="IKA Sushi"><h1>IKA SUSHI</h1><p>RAPPORT JOURNALIER</p><p>${escapeHtml(dateLabel)}</p><p class="range">00:00 → 00:00 le lendemain</p></header><section class="summary"><h2>Récapitulatif des transactions</h2><div class="transactions"><strong>${report.orderCount}</strong><span>commandes créées · ${escapeHtml(totalAmount)}</span></div><table><thead><tr><th>Activité</th><th>Nb</th><th>Montant</th></tr></thead><tbody>${summaryRows}</tbody></table></section><div class="grand-total">Valeur des commandes créées : ${escapeHtml(totalAmount)}</div><p class="note">Les comptes « envoyées » et « livrées » sont basés sur la date du changement de statut. Le montant total correspond aux commandes créées pendant cette journée.</p><footer class="thanks">Fin du rapport · IKA SUSHI</footer></body></html>`;
}

export default function DailyOrdersPrintButton({ date, report }: { date: Date; report: DailyReport }) {
  const print = () => {
    const frame = document.createElement("iframe");
    frame.title = `Rapport journalier ${date.toLocaleDateString("fr-MA")}`;
    frame.setAttribute("aria-hidden", "true");
    frame.style.cssText = "position:fixed;left:-10000px;top:0;width:80mm;height:1px;border:0";
    try {
      document.body.appendChild(frame);
      const printWindow = frame.contentWindow;
      const printDocument = frame.contentDocument;
      if (!printWindow || !printDocument) throw new Error("Impossible de préparer le rapport à imprimer.");
      printDocument.open();
      printDocument.write(dailyReportHtml(date, report));
      printDocument.close();
      printWindow.addEventListener("afterprint", () => frame.remove(), { once: true });
      printWindow.focus();
      printWindow.print();
    } catch {
      frame.remove();
    }
  };

  return <button className="Ika-reports-print-button" type="button" onClick={print} title="Imprimer le récapitulatif du jour en 80 mm"><i className="fas fa-print" aria-hidden="true" /><span>Imprimer</span></button>;
}