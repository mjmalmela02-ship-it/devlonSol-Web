import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/devlon-logo.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/printing", label: "Printing" },
  { to: "/invoice", label: "Pricing" },
  { to: "/about", label: "About us" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" aria-label="Devlon Solutions home" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="Devlon Solutions & Services" className="h-10 w-auto md:h-12" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }}>
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary !py-2.5">Get a quote</Link>
        </nav>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-5 pb-5 pt-2 md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-lg font-medium text-muted-foreground" activeProps={{ className: "text-foreground bg-surface" }} activeOptions={{ exact: true }}>
              {l.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2">Get a quote</Link>
        </nav>
      )}
    </header>
  );
}
