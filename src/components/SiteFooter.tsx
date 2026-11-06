import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, MessageCircle, Instagram } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";
import logo from "@/assets/devlon-logo.png.asset.json";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <>
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
          <div>
            <img src={logo.url} alt="Devlon Solutions & Services" className="h-12 w-auto" />
            <p className="mt-4 text-sm text-muted-foreground">Websites built to help your business grow. Proudly based in Polokwane, Limpopo.</p>
          </div>
          <div>
            <h4 className="font-semibold">Pages</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              <li><Link to="/printing" className="hover:text-foreground">Printing</Link></li>
              <li><Link to="/invoice" className="hover:text-foreground">Pricing & invoice</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About us</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Get in touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-foreground"><Phone className="size-4 text-accent" />{SITE.phoneDisplay}</a></li>
              <li><a href={SITE.emailHref} className="flex items-center gap-2 break-all hover:text-foreground"><Mail className="size-4 shrink-0 text-accent" />{SITE.email}</a></li>
              <li><a href={SITE.instagramHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground"><Instagram className="size-4 text-accent" />@{SITE.instagram}</a></li>
              <li className="flex items-center gap-2"><MapPin className="size-4 text-accent" />{SITE.location}</li>
            </ul>
          </div>
        </div>
        <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Devlon Solutions. All rights reserved.</p>
      </footer>
      <a href={SITE.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg transition hover:scale-105">
        <MessageCircle className="size-7" />
      </a>
      <ChatWidget />
    </>
  );
}
