export const BASIC_PACKAGE_PRICE = 1000; // ZAR minimum: basic website + 1 year domain & maintenance

export type LineItem = { description: string; qty: number; price: number };

export function invoiceTotal(items: LineItem[]) {
  const sum = items.reduce((t, i) => t + Math.max(0, i.qty) * Math.max(0, i.price), 0);
  return Math.max(BASIC_PACKAGE_PRICE, sum);
}

// Deterministic (same on server and browser): "R 1 000.00"
export const formatZAR = (n: number) => {
  const [int = "0", dec = "00"] = (Math.round(n * 100) / 100).toFixed(2).split(".");
  return "R " + int.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "." + dec;
};

export const WHATSAPP_NUMBER = "27689652237";

export function buildInvoiceMessage(inv: { number: string; date: string; client: { name: string; contact: string }; items: LineItem[] }) {
  const lines = inv.items
    .filter((i) => i.description.trim() || i.price > 0)
    .map((i) => `• ${i.description.trim() || "Item"} — ${i.qty} × ${formatZAR(i.price)} = ${formatZAR(Math.max(0, i.qty) * Math.max(0, i.price))}`);
  return [
    "Hi Devlon Solutions, I'd like to confirm this invoice.",
    `Invoice: ${inv.number}${inv.date ? ` (${inv.date})` : ""}`,
    `Name: ${inv.client.name.trim() || "-"}`,
    `Contact: ${inv.client.contact.trim() || "-"}`,
    "",
    ...lines,
    "",
    `Total: ${formatZAR(invoiceTotal(inv.items))}`,
  ].join("\n");
}

export const invoiceWhatsAppUrl = (inv: Parameters<typeof buildInvoiceMessage>[0]) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildInvoiceMessage(inv))}`;
