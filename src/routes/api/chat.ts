import { createFileRoute } from "@tanstack/react-router";
import type { UIMessage } from "ai";
import type { Json } from "@/integrations/supabase/types";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as { threadId?: string; visitorToken?: string; messages?: UIMessage[] } | null;
        if (!body?.threadId || !body.visitorToken || !Array.isArray(body.messages)) {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { handleChat } = await import("@/lib/ai/chat.server");
        const { data: thread } = await supabaseAdmin
          .from("chat_threads").select("id, title").eq("id", body.threadId).eq("visitor_token", body.visitorToken).maybeSingle();
        if (!thread) return Response.json({ error: "Chat not found" }, { status: 404 });

        const threadId = thread.id;
        return handleChat(request, {
          threadId,
          messages: body.messages,
          saveLead: async (lead) => {
            const { error } = await supabaseAdmin.from("leads").insert({ ...lead, thread_id: threadId });
            if (error) throw new Error(error.message);
          },
          onFinish: async (messages) => {
            const { error: delErr } = await supabaseAdmin.from("chat_messages").delete().eq("thread_id", threadId);
            if (delErr) throw new Error(delErr.message);
            const rows = messages.map((m, i) => ({
              thread_id: threadId,
              role: m.role,
              message: m as unknown as Json,
              created_at: new Date(Date.now() + i).toISOString(),
            }));
            const { error } = await supabaseAdmin.from("chat_messages").insert(rows);
            if (error) throw new Error(error.message);
            const firstUser = messages.find((m) => m.role === "user");
            const text = firstUser?.parts.find((p) => p.type === "text") as { text: string } | undefined;
            await supabaseAdmin.from("chat_threads").update({
              updated_at: new Date().toISOString(),
              ...(thread.title === "New chat" && text ? { title: text.text.slice(0, 60) } : {}),
            }).eq("id", threadId);
          },
        });
      },
    },
  },
});
