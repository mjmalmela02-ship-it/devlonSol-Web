import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, FileText, Image, Shirt, Sticker, BookOpen, Signpost, Stamp } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { PrintQuoteForm } from "@/components/PrintQuoteForm";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/printing")({
  head: () => ({
    meta: [
      { title: "Printing solutions — Devlon Solutions, Polokwane" },
      { name: "description", content: "Business cards, flyers, posters, banners, branded clothing and more from Devlon Solutions in Polokwane, Limpopo." },
      { property: "og:title", content: "Printing solutions — Devlon Solutions" },
      { property: "og:description", content: "Business cards, flyers, banners, branded clothing and more, printed in Polokwane." },
    ],
  }),
  component: Printing,
});

const items = [
  { icon: CreditCard, title: "Business cards", text: "Sharp, professional cards that match your brand and website." },
  { icon: FileText, title: "Flyers & brochures", text: "Eye-catching handouts to promote your services, specials and events." },
  { icon: Image, title: "Posters", text: "Bold posters for shop windows, notice boards and launches." },
  { icon: Signpost, title: "Banners & signage", text: "Pull-up banners and signs that make your business easy to spot." },
  { icon: Shirt, title: "Branded clothing", text: "T-shirts and workwear with your logo for your team and events." },
  { icon: Sticker, title: "Stickers & labels", text: "Product labels, packaging stickers and branded seals." },
  { icon: BookOpen, title: "Company profiles", text: "Printed profiles and documents that present your business well." },
  { icon: Stamp, title: "Logo & print design", text: "Don't have artwork yet? We design it for you before printing." },
];

function Printing() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-14 md:pt-24">
        <span className="text-sm font-medium text-accent">Printing solutions</span>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.05] md:text-7xl animate-rise">
          Your brand, online <span className="text-accent">and on paper.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          From business cards to banners, we design and print everything your business needs to look the same everywhere customers see you.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#quote" className="btn-accent">Get a printing quote</a>
          <a href={SITE.phoneHref} className="btn-outline">Call {SITE.phoneDisplay}</a>
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-3xl scroll-mt-24 px-5 pb-20">
        <PrintQuoteForm />
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <article key={i.title} className="rounded-xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:border-primary">
              <i.icon className="size-8 text-primary" />
              <h2 className="mt-5 text-lg font-bold">{i.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{i.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-20">
        <h2 className="text-3xl font-bold md:text-4xl">Website + print, one team</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Getting a new website? Bundle it with matching business cards and flyers so your brand looks consistent from day one. <Link to="/contact" className="text-accent underline">Ask us about it.</Link>
        </p>
      </section>

      <CtaBand />
    </>
  );
}
