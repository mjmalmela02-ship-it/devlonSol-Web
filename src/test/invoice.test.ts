import { describe, it, expect } from "vitest";
import { invoiceTotal } from "@/lib/invoice";

describe("invoice total", () => {
  it("never goes below the R1000 basic package minimum", () => {
    expect(invoiceTotal([{ description: "x", qty: 1, price: 200 }])).toBe(1000);
  });
  it("adds extras on top of the basic package", () => {
    expect(invoiceTotal([{ description: "a", qty: 1, price: 1000 }, { description: "b", qty: 2, price: 250 }])).toBe(1500);
  });
});

import { invoiceWhatsAppUrl } from "@/lib/invoice";
describe("invoice WhatsApp link", () => {
  it("goes to Devlon's WhatsApp number with the total", () => {
    const url = invoiceWhatsAppUrl({ number: "DS-1", date: "", client: { name: "Thabo", contact: "0712345678" }, items: [{ description: "Website", qty: 1, price: 1500 }] });
    expect(url.startsWith("https://wa.me/27689652237?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1]!)).toContain("Total: R 1 500.00");
  });
});
