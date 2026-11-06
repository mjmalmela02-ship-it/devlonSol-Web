import { useState } from "react";
import { MessageCircle } from "lucide-react";

export const PRINT_TYPES = ["Business cards", "Flyers & brochures", "Posters", "Banners & signage", "Branded clothing", "Stickers & labels", "Company profiles", "Other"];
const SIZES = ["Standard business card (90×50mm)", "A6", "A5", "A4", "A3", "A2", "A1", "Pull-up banner", "Custom size"];
const FINISHES = ["None", "Gloss", "Matte", "Lamination", "Spot UV", "Embossing", "Rounded corners"];

export function buildPrintMessage(f: { type: string; size: string; quantity: string; finishing: string; notes: string }) {
  return [
    "Hi Devlon Solutions, I'd like a quote for printing.",
    `• Print type: ${f.type}`,
    `• Size: ${f.size}`,
    `• Quantity: ${f.quantity}`,
    `• Finishing: ${f.finishing}`,
    f.notes.trim() ? `• Notes: ${f.notes.trim()}` : "",
  ].filter(Boolean).join("\n");
}

const input = "mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground";

export function PrintQuoteForm({ onSubmit }: { onSubmit?: (f: ReturnType<typeof empty>) => Promise<void> | void }) {
  const [f, setF] = useState(empty());
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const win = window.open("about:blank", "_blank");
    try { await onSubmit?.(f); } catch (err) { console.error(err); }
    const url = "https://wa.me/27689652237?text=" + encodeURIComponent(buildPrintMessage(f));
    if (win) win.location.href = url; else window.location.href = url;
  };

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl border-2 border-foreground bg-surface p-6 shadow-offset sm:grid-cols-2 md:p-8">
      <h2 className="text-2xl font-bold sm:col-span-2">Build your printing quote</h2>
      <label className="text-sm font-medium">Print type
        <select required className={input} value={f.type} onChange={set("type")}>{PRINT_TYPES.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="text-sm font-medium">Size
        <select required className={input} value={f.size} onChange={set("size")}>{SIZES.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="text-sm font-medium">Quantity
        <input required type="number" min={1} className={input} value={f.quantity} onChange={set("quantity")} />
      </label>
      <label className="text-sm font-medium">Finishing
        <select className={input} value={f.finishing} onChange={set("finishing")}>{FINISHES.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="text-sm font-medium sm:col-span-2">Notes (optional)
        <textarea rows={3} maxLength={500} className={input} placeholder="Colours, paper type, deadline…" value={f.notes} onChange={set("notes")} />
      </label>
      <button type="submit" className="btn-accent sm:col-span-2"><MessageCircle className="size-5" />Send quote request on WhatsApp</button>
    </form>
  );
}

function empty() {
  return { type: PRINT_TYPES[0]!, size: SIZES[0]!, quantity: "100", finishing: FINISHES[0]!, notes: "" };
}
