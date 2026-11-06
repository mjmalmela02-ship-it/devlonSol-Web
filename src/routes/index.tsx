import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, ShoppingCart, LayoutDashboard, RefreshCw, ShieldCheck, Search, Smartphone, Zap, MapPin, Printer } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Devlon Solutions — Websites that get your business found" },
      { name: "description", content: "Fast, clear websites, online stores and web apps for businesses in Polokwane, Limpopo and across South Africa." },
      { property: "og:title", content: "Devlon Solutions — Websites that get your business found" },
      { property: "og:description", content: "Fast, clear websites, online stores and web apps from a young Polokwane studio." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Globe, title: "Business websites", text: "A clear, professional site that explains what you do and how customers can reach you." },
  { icon: ShoppingCart, title: "Online stores", text: "Product pages, a shopping cart and secure payments, so you can sell around the clock." },
  { icon: LayoutDashboard, title: "Custom web apps", text: "Booking systems, dashboards and internal tools built around how your business works." },
  { icon: RefreshCw, title: "Website redesign", text: "A fresh look and faster pages for a site that feels out of date or hard to use on a phone." },
  { icon: ShieldCheck, title: "Hosting & maintenance", text: "We keep your website online, secure and up to date, so you can focus on your customers." },
  { icon: Search, title: "Google presence", text: "Set up so people searching for your business or your services can find you." },
  { icon: Printer, title: "Printing solutions", text: "Business cards, flyers, banners and branded clothing that match your website." },
];

const steps = [
  { n: "01", title: "Talk", text: "We learn about your business, your customers and what the website must do." },
  { n: "02", title: "Design", text: "You see the layout and look of your site before we build anything." },
  { n: "03", title: "Build", text: "We develop the site, test it on phones and computers, and apply your feedback." },
  { n: "04", title: "Launch", text: "Your site goes live, and we stay on hand for updates and support." },
];

const perks = [
  { icon: Smartphone, label: "Mobile-first" },
  { icon: Zap, label: "Fast loading" },
  { icon: Search, label: "Google-ready" },
  { icon: MapPin, label: "Local to Limpopo" },
];

function Index() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-14 md:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-accent animate-rise">
          <MapPin className="size-3.5" /> Based in Polokwane, Limpopo
        </span>
        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] md:text-7xl animate-rise">
          Websites that help your business get found and <span className="text-accent">get chosen.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-rise">
          Devlon Solutions designs and builds fast, clear websites for businesses that want to look professional online and make it easy for customers to get in touch.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 animate-rise">
          <Link to="/contact" className="btn-primary">Get a free quote</Link>
          <a href="#services" className="btn-outline">See our services</a>
        </div>

        <div className="mt-14 rounded-2xl border-2 border-foreground bg-surface shadow-offset animate-rise">
          <div className="flex items-center gap-3 border-b-2 border-foreground px-4 py-3">
            <div className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="size-3 rounded-full border-2 border-foreground" />)}</div>
            <div className="flex-1 rounded-full bg-background px-4 py-1.5 text-sm text-muted-foreground">yourbusiness.co.za</div>
          </div>
          <div className="space-y-4 p-6 md:p-8">
            <div className="flex justify-between"><div className="h-2.5 w-1/4 rounded-full bg-muted" /><div className="h-2.5 w-1/3 rounded-full bg-muted" /></div>
            <div className="h-6 w-4/5 rounded-md bg-foreground" />
            <div className="h-6 w-1/2 rounded-md bg-foreground" />
            <div className="h-9 w-1/3 rounded-md bg-accent" />
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 rounded-md bg-accent" />
              <div className="h-20 rounded-md border border-border bg-background" />
              <div className="h-20 rounded-md border border-border bg-background" />
            </div>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {perks.map((p) => (
            <li key={p.label} className="flex items-center gap-3 text-sm font-medium"><p.icon className="size-5 text-accent" />{p.label}</li>
          ))}
        </ul>
      </section>

      <section id="services" className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-bold md:text-5xl">What we build for you</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">From a simple business site to a full online store, we handle design, development and launch.</p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.title} className="group rounded-xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:border-primary">
                <s.icon className="size-8 text-primary" />
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                {s.title === "Printing solutions" && (
                  <Link to="/printing" className="mt-4 inline-block text-sm font-semibold text-accent">See printing options →</Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-bold md:text-5xl">How we work</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="border-t-2 border-accent pt-5">
              <span className="font-display text-sm font-bold text-accent">{s.n}</span>
              <h3 className="mt-2 text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <h2 className="text-3xl font-bold md:text-5xl">Common questions</h2>
        <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
          {[
            ["Do my website and pages work on phones?", "Yes. Every site we build is designed for phones first, then tested on tablets and computers."],
            ["Can you help me appear on Google?", "Yes. We set up your Google presence so customers searching for your business or services can find you."],
            ["Do you work with businesses outside Polokwane?", "Absolutely. We're based in Limpopo but work with businesses anywhere in South Africa over WhatsApp, phone and email."],
            ["What happens after my site launches?", "We stay available for updates, hosting and support so your website keeps working as your business grows."],
          ].map(([q, a]) => (
            <details key={q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {q}<span className="text-accent transition group-open:rotate-45 text-2xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
