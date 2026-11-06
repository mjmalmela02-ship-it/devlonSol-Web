import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MessageCircle, MapPin, Copy, Check } from "lucide-react";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Devlon Solutions — Get a free quote" },
      { name: "description", content: "Call, WhatsApp or email Devlon Solutions in Polokwane for a free website quote: +27 68 965 2237." },
      { property: "og:title", content: "Contact Devlon Solutions" },
      { property: "og:description", content: "Call, WhatsApp or email us for a free website quote." },
    ],
  }),
  component: Contact,
});

function CopyBtn({ value }: { value: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label="Copy"
      onClick={() => { navigator.clipboard.writeText(value); setDone(true); setTimeout(() => setDone(false), 1500); }}
      className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      {done ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
    </button>
  );
}

function Contact() {
  const cards = [
    { icon: MessageCircle, title: "WhatsApp", value: SITE.phoneDisplay, href: SITE.whatsapp, cta: "Start a chat", ext: true, copy: "+27689652237" },
    { icon: Phone, title: "Call us", value: SITE.phoneDisplay, href: SITE.phoneHref, cta: "Call now", copy: "+27689652237" },
    { icon: Mail, title: "Email", value: SITE.email, href: SITE.emailHref, cta: "Send an email", copy: SITE.email },
  ];
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-14 md:pt-24">
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] md:text-7xl animate-rise">
          Let's talk about your <span className="text-accent">website.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Tell us what you need and we will reply with a clear plan and a quote. Pick whichever way suits you best.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-3">
        {cards.map((c) => (
          <article key={c.title} className="flex flex-col rounded-xl border border-border bg-surface p-6">
            <c.icon className="size-8 text-accent" />
            <h2 className="mt-5 text-xl font-bold">{c.title}</h2>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="break-all text-sm text-muted-foreground">{c.value}</span>
              <CopyBtn value={c.copy} />
            </div>
            <a href={c.href} target={c.ext ? "_blank" : undefined} rel="noreferrer" className="btn-primary mt-6">{c.cta}</a>
          </article>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">Where to find us</h2>
          <p className="mt-4 flex items-start gap-2 text-muted-foreground"><MapPin className="mt-1 size-5 shrink-0 text-accent" />{SITE.location}</p>
          <h3 className="mt-10 text-xl font-bold">What to include in your message</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• Your business name and what you do</li>
            <li>• The type of website you need (business site, store, web app, redesign)</li>
            <li>• Any websites you like the look of</li>
            <li>• When you'd like to launch</li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl border-2 border-foreground shadow-offset">
          <iframe
            title="Map of Polokwane"
            src="https://www.google.com/maps?q=Polokwane,Limpopo&output=embed"
            className="h-80 w-full md:h-full md:min-h-96"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
