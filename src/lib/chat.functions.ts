import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { UIMessage } from "ai";

const token = z.string().min(20).max(100);

export const listThreads = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ visitorToken: token }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("chat_threads").select("id, title, updated_at").eq("visitor_token", data.visitorToken).order("updated_at", { ascending: false }).limit(30);
    if (error) throw new Error(error.message);
    return rows;
  });

export const createThread = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ visitorToken: token }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin.from("chat_threads").select("id", { count: "exact", head: true }).eq("visitor_token", data.visitorToken);
    if ((count ?? 0) >= 30) throw new Error("Too many chats. Please continue an existing one.");
    const { data: row, error } = await supabaseAdmin.from("chat_threads").insert({ visitor_token: data.visitorToken }).select("id").single();
    if (error) throw new Error(error.message);
    return row.id;
  });

export const getThreadMessages = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ visitorToken: token, threadId: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: thread } = await supabaseAdmin.from("chat_threads").select("id").eq("id", data.threadId).eq("visitor_token", data.visitorToken).maybeSingle();
    if (!thread) return null;
    const { data: rows, error } = await supabaseAdmin.from("chat_messages").select("message").eq("thread_id", data.threadId).order("created_at");
    if (error) throw new Error(error.message);
    return JSON.stringify(rows.map((r) => r.message as unknown as UIMessage));
  });

export const savePrintQuote = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({
      type: z.string().min(1).max(80),
      size: z.string().min(1).max(80),
      quantity: z.coerce.number().int().min(1).max(1000000),
      finishing: z.string().min(1).max(80),
      notes: z.string().max(500),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("print_quote_requests").insert({
      print_type: data.type, size: data.size, quantity: data.quantity, finishing: data.finishing, notes: data.notes || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
