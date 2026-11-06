import { createFileRoute } from "@tanstack/react-router";
import { Heart, Rocket, Handshake, MapPin } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About us — Devlon Solutions, Polokwane" },
      { name: "description", content: "Devlon Solutions is a young web startup in north Polokwane, Limpopo, founded by CEO Joseph Malemela." },
      { property: "og:title", content: "About Devlon Solutions" },
      { property: "og:description", content: "A young Polokwane web studio founded by Joseph Malemela." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Rocket, title: "Young & driven", text: "We're a fresh startup with modern tools and the energy to give every project our full attention." },
  { icon: Handshake, title: "Straight talk", text: "Clear plans, clear quotes and regular updates. You always know where your project stands." },
  { icon: Heart, title: "Built with care", text: "Every site works well on phones, loads quickly and is easy for your customers to use." },
];

function About() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:pt-24">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-accent"><MapPin className="size-4" /> {SITE.location}</span>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.05] md:text-7xl animate-rise">
          A young startup from the heart of <span className="text-accent">north Polokwane.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          We are a web studio that builds websites for businesses that want to be taken seriously online. You tell us what you need, and we take care of the design, the code and the launch.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 md:grid-cols-[1fr_1.3fr] md:items-center">
        <div className="rounded-2xl border-2 border-foreground bg-surface p-8 shadow-offset">
          <div className="grid size-20 place-items-center rounded-full bg-accent font-display text-3xl font-extrabold text-accent-foreground">JM</div>
          <h2 className="mt-6 text-3xl font-bold">{SITE.ceo}</h2>
          <p className="mt-1 font-medium text-primary">CEO & Founder</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Joseph started Devlon Solutions to help local businesses in Limpopo compete online with websites that look professional and bring in customers.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">Our story</h2>
          <p className="mt-4 text-muted-foreground">
            Too many great local businesses are hard to find online. Devlon Solutions was founded in Polokwane to change that — giving small and growing businesses the same quality of website the big brands have.
          </p>
          <p className="mt-4 text-muted-foreground">
            After launch we stay available, so your website keeps working as your business grows.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-bold md:text-5xl">What we stand for</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <article key={v.title} className="rounded-xl border border-border bg-background p-6">
                <v.icon className="size-8 text-accent" />
                <h3 className="mt-5 text-xl font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
