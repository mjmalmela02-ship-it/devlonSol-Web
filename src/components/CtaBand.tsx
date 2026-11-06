import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="rounded-2xl border-2 border-foreground bg-surface p-8 shadow-offset md:p-14">
        <h2 className="text-3xl font-bold md:text-5xl">Ready to get your business online?</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">Tell us what you need and we will reply with a clear plan and a quote.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="btn-accent">WhatsApp us</a>
          <Link to="/contact" className="btn-outline">All contact options</Link>
        </div>
      </div>
    </section>
  );
}
