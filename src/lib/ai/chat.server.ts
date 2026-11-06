import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from "ai";
import { z } from "zod";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId, withLovableAiGatewayRunIdHeader } from "./run-id.server";

const MODEL = "openai/gpt-6-astra";
const MAX_MESSAGES_PER_THREAD = 60;

const INSTRUCTIONS = `You are "Devi", the friendly assistant for Devlon Solutions & Services, a young web and printing startup based in north Polokwane, Limpopo, South Africa. CEO & Founder: Joseph Malemela.
Contact: phone/WhatsApp +27 68 965 2237, email dixiedevSol@gmail.com, Instagram @devlonsolutions (instagram.com/devlonsolutions) for our latest work.

Services: business websites, online stores, custom web apps, website redesign, hosting & maintenance, Google presence, and printing (business cards, flyers & brochures, posters, banners & signage, branded clothing, stickers & labels, company profiles, logo & print design).
Pricing you may state: the Basic website package starts at R1 000 (minimum), including 1 year domain and maintenance. Any other price must be quoted by the team — never invent prices, timelines, discounts or policies.
Process: Talk → Design → Build → Launch.

Be warm, short and clear (South African English). Answer general questions yourself.
When the visitor has a REAL enquiry (wants a quote, wants to hire Devlon, wants to order printing, or asks to be contacted), collect: their name, a phone number or email, the service, and a short description of what they need. Ask only for what is missing. Once you have name + (phone or email) + details, call the save_enquiry tool exactly once. After it succeeds, tell them the team will be in touch and that they can also tap the WhatsApp button shown to send the summary straight to the team.`;

export async function handleChat(request: Request, opts: { threadId: string; messages: UIMessage[]; onFinish: (messages: UIMessage[]) => Promise<void>; saveLead: (lead: LeadInput) => Promise<void> }) {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) return Response.json({ error: "The assistant is not configured yet." }, { status: 500 });
  if (opts.messages.length > MAX_MESSAGES_PER_THREAD) {
    return Response.json({ error: "This chat is getting long — please start a new chat or WhatsApp us on +27 68 965 2237." }, { status: 429 });
  }

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses(MODEL),
    system: INSTRUCTIONS,
    messages: await convertToModelMessages(opts.messages),
    abortSignal: request.signal,
    stopWhen: stepCountIs(50),
    tools: {
      save_enquiry: tool({
        description: "Save a real customer enquiry so the Devlon team can follow up. Use only when you have the visitor's name, a phone or email, and what they need.",
        inputSchema: z.object({
          name: z.string(),
          phone: z.string().nullable(),
          email: z.string().nullable(),
          service: z.string().nullable(),
          details: z.string(),
        }),
        execute: async (lead) => {
          if (!lead.phone && !lead.email) return { saved: false, reason: "Need a phone number or email." };
          await opts.saveLead(lead);
          const summary = [
            "Hi Devlon Solutions, I chatted with your assistant.",
            `Name: ${lead.name}`,
            lead.phone ? `Phone: ${lead.phone}` : "",
            lead.email ? `Email: ${lead.email}` : "",
            lead.service ? `Service: ${lead.service}` : "",
            `Request: ${lead.details}`,
          ].filter(Boolean).join("\n");
          return { saved: true, whatsappUrl: "https://wa.me/27689652237?text=" + encodeURIComponent(summary) };
        },
      }),
    },
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  return withLovableAiGatewayRunIdHeader(
    result.toUIMessageStreamResponse({
      originalMessages: opts.messages,
      sendReasoning: false,
      onFinish: async ({ messages }) => {
        try { await opts.onFinish(messages); } catch (e) { console.error("Failed to save chat", e); }
      },
      onError: (e) => {
        console.error(e);
        const status = (e as { statusCode?: number })?.statusCode;
        if (status === 402) return "The assistant is out of credits right now. Please WhatsApp us on +27 68 965 2237.";
        if (status === 429) return "The assistant is busy — please try again in a moment.";
        return "Sorry, something went wrong. Please try again or WhatsApp us on +27 68 965 2237.";
      },
    }),
    runIdFetch,
  );
}

export type LeadInput = { name: string; phone: string | null; email: string | null; service: string | null; details: string };
