import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Printer, Trash2, Check, MessageCircle } from "lucide-react";
import logo from "@/assets/devlon-logo.png.asset.json";
import { SITE } from "@/lib/site";
import { BASIC_PACKAGE_PRICE, formatZAR, invoiceTotal, invoiceWhatsAppUrl, type LineItem } from "@/lib/invoice";

export const Route = createFileRoute("/invoice")({
  head: () => ({
    meta: [
      { title: "Website package & invoice — Devlon Solutions" },
      { name: "description", content: "Basic website plus 1 year domain and maintenance from R1000. Create a printable Devlon Solutions invoice." },
      { property: "og:title", content: "Basic website from R1000 — Devlon Solutions" },
      { property: "og:description", content: "Basic website plus 1 year domain and maintenance from R1000." },
    ],
  }),
  component: InvoicePage,
});

const BASE: LineItem = { description: "Basic website + 1 year domain & maintenance", qty: 1, price: BASIC_PACKAGE_PRICE };
const field = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm print:border-0 print:p-0";

function InvoicePage() {
  const [client, setClient] = useState({ name: "", contact: "" });
  const [items, setItems] = useState<LineItem[]>([BASE]);
  const [meta, setMeta] = useState({ number: "", date: "" });
  useEffect(() => {
    const d = new Date();
    setMeta({ number: "DS-" + d.toISOString().slice(2, 10).replace(/-/g, "") + "-" + String(d.getHours()).padStart(2, "0") + String(d.getMinutes()).padStart(2, "0"), date: d.toLocaleDateString("en-ZA") });
  }, []);
  const update = (i: number, patch: Partial<LineItem>) => setItems(items.map((it, j) => (j === i ? { ...it, ...patch } : it)));
  const total = invoiceTotal(items);

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-14 md:pt-20 print:hidden">
        <span className="text-sm font-medium text-accent">Pricing</span>
        <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] md:text-6xl">
          A professional website from <span className="text-accent">{formatZAR(BASIC_PACKAGE_PRICE).replace(".00", "")}</span>
        </h1>
        <div className="mt-8 max-w-xl rounded-2xl border-2 border-foreground bg-surface p-6 shadow-offset">
          <h2 className="text-2xl font-bold">Basic website package</h2>
          <p className="mt-1 text-muted-foreground">Minimum price · once-off</p>
          <p className="mt-4 font-display text-5xl font-extrabold">{formatZAR(BASIC_PACKAGE_PRICE).replace(".00", "")}</p>
          <ul className="mt-5 space-y-2 text-sm">
            {["Basic business website", "Works on phones and computers", "1 year domain included", "1 year maintenance included"].map((t) => (
              <li key={t} className="flex gap-2"><Check className="size-4 text-accent" />{t}</li>
            ))}
          </ul>
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="btn-accent mt-6 w-full">Order on WhatsApp</a>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-20 print:max-w-none print:p-0">
        <div className="mb-4 flex items-center justify-between print:hidden">
          <h2 className="text-2xl font-bold">Create an invoice</h2>
          <button onClick={() => window.print()} className="btn-primary !py-2.5"><Printer className="size-4" />Print / Save PDF</button>
        </div>

        <div className="invoice-sheet rounded-2xl border border-border bg-surface p-6 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <img src={logo.url} alt="Devlon Solutions" className="h-12 w-auto" />
              <p className="mt-3 text-xs text-muted-foreground">{SITE.location}<br />{SITE.phoneDisplay} · {SITE.email}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-3xl font-extrabold">INVOICE</p>
              <p className="text-sm text-muted-foreground">No. {meta.number}</p>
              <p className="text-sm text-muted-foreground">Date: {meta.date}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground">Bill to
              <input className={field + " mt-1 normal-case"} placeholder="Client / business name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
            </label>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Contact
              <input className={field + " mt-1 normal-case"} placeholder="Phone or email" value={client.contact} onChange={(e) => setClient({ ...client, contact: e.target.value })} />
            </label>
          </div>

          <div className="mt-8 space-y-3">
            <div className="hidden grid-cols-[1fr_4rem_7rem_7rem_2rem] gap-3 text-xs font-semibold uppercase text-muted-foreground sm:grid">
              <span>Description</span><span>Qty</span><span>Price</span><span className="text-right">Amount</span><span />
            </div>
            {items.map((it, i) => (
              <div key={i} className="grid grid-cols-[1fr_4rem] gap-3 border-b border-border pb-3 sm:grid-cols-[1fr_4rem_7rem_7rem_2rem] sm:items-center">
                <input className={field + " col-span-2 sm:col-span-1"} value={it.description} onChange={(e) => update(i, { description: e.target.value })} placeholder="Item description" />
                <input type="number" min={1} className={field} value={it.qty} onChange={(e) => update(i, { qty: Number(e.target.value) })} />
                <input type="number" min={0} className={field} value={it.price} onChange={(e) => update(i, { price: Number(e.target.value) })} />
                <span className="text-right text-sm font-medium">{formatZAR(it.qty * it.price)}</span>
                <button aria-label="Remove item" disabled={items.length === 1} onClick={() => setItems(items.filter((_, j) => j !== i))} className="justify-self-end text-muted-foreground hover:text-destructive disabled:opacity-30 print:hidden"><Trash2 className="size-4" /></button>
              </div>
            ))}
            <button onClick={() => setItems([...items, { description: "", qty: 1, price: 0 }])} className="flex items-center gap-2 text-sm font-medium text-accent print:hidden"><Plus className="size-4" />Add item</button>
          </div>

          <div className="mt-8 flex flex-col items-end gap-1">
            <p className="text-sm text-muted-foreground">Minimum invoice: {formatZAR(BASIC_PACKAGE_PRICE)}</p>
            <p className="font-display text-3xl font-extrabold">Total {formatZAR(total)}</p>
          </div>
          <a href={invoiceWhatsAppUrl({ number: meta.number, date: meta.date, client, items })} target="_blank" rel="noreferrer" className="btn-accent mt-6 w-full print:hidden"><MessageCircle className="size-5" />Send invoice on WhatsApp</a>
          <p className="mt-8 text-xs text-muted-foreground">Thank you for choosing Devlon Solutions. CEO & Founder: {SITE.ceo}</p>
        </div>
      </section>
    </>
  );
}
