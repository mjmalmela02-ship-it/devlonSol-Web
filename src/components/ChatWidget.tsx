import { useEffect, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Bot, MessageSquarePlus, Send, X, History, MessageCircle } from "lucide-react";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { createThread, getThreadMessages, listThreads } from "@/lib/chat.functions";

const TOKEN_KEY = "devlon-visitor-token";
type Thread = { id: string; title: string; updated_at: string };

function getToken() {
  let t = localStorage.getItem(TOKEN_KEY);
  if (!t) { t = crypto.randomUUID() + crypto.randomUUID(); localStorage.setItem(TOKEN_KEY, t); }
  return t;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [initial, setInitial] = useState<UIMessage[]>([]);
  const [showList, setShowList] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => { setToken(getToken()); }, []);

  async function refresh(t: string) {
    const rows = await listThreads({ data: { visitorToken: t } });
    setThreads(rows as Thread[]);
    return rows as Thread[];
  }

  async function openThread(id: string) {
    if (!token) return;
    const json = await getThreadMessages({ data: { visitorToken: token, threadId: id } });
    setInitial(json ? (JSON.parse(json) as UIMessage[]) : []);
    setThreadId(id);
    setShowList(false);
  }

  async function newThread() {
    if (!token) return;
    try {
      const id = await createThread({ data: { visitorToken: token } });
      setInitial([]); setThreadId(id); setShowList(false);
      await refresh(token);
    } catch (e) { setErr((e as Error).message); }
  }

  useEffect(() => {
    if (!open || !token || threadId) return;
    refresh(token).then((rows) => (rows[0] ? openThread(rows[0].id) : newThread())).catch((e) => setErr(String(e.message ?? e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, token]);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Ask our assistant"}
        className="fixed bottom-24 right-5 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-lg transition hover:scale-105 print:hidden"
      >
        {open ? <X className="size-5" /> : <Bot className="size-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask Devi"}</span>
      </button>
      {open && (
        <div className="fixed inset-x-3 bottom-40 top-20 z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:left-auto sm:right-5 sm:top-auto sm:h-[560px] sm:w-[390px] print:hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="font-semibold">Devi · Devlon assistant</p>
              <p className="text-xs text-muted-foreground">Websites & printing questions</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setShowList((s) => !s)} aria-label="Past chats" className="rounded-md p-2 hover:bg-muted"><History className="size-4" /></button>
              <button onClick={newThread} aria-label="New chat" className="rounded-md p-2 hover:bg-muted"><MessageSquarePlus className="size-4" /></button>
            </div>
          </div>
          {err && <p className="bg-destructive/15 px-4 py-2 text-xs text-destructive">{err}</p>}
          {showList ? (
            <ul className="flex-1 overflow-y-auto p-2">
              {threads.map((t) => (
                <li key={t.id}>
                  <button onClick={() => openThread(t.id)} className={`w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted ${t.id === threadId ? "bg-muted" : ""}`}>
                    <span className="block truncate">{t.title}</span>
                    <span className="text-xs text-muted-foreground">{new Date(t.updated_at).toLocaleString()}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : threadId && token ? (
            <ChatThread key={threadId} threadId={threadId} token={token} initial={initial} onDone={() => refresh(token)} />
          ) : (
            <p className="flex-1 p-4 text-sm text-muted-foreground">Loading…</p>
          )}
        </div>
      )}
    </>
  );
}

function ChatThread({ threadId, token, initial, onDone }: { threadId: string; token: string; initial: UIMessage[]; onDone: () => void }) {
  const [input, setInput] = useState("");
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { threadId, visitorToken: token } }),
    [threadId, token],
  );
  const { messages, sendMessage, status, error, stop } = useChat({ id: threadId, messages: initial, transport, onFinish: onDone });
  const busy = status === "submitted" || status === "streaming";

  const submit = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
  };

  return (
    <>
      <Conversation className="flex-1">
        <ConversationContent className="gap-4 p-4">
          {messages.length === 0 && (
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Hi! I'm Devi. Tell me about the website or printing you need, and I'll help — or pass you to the team.</p>
              {["How much is a basic website?", "I need 500 business cards", "Can you redesign my site?"].map((s) => (
                <button key={s} onClick={() => submit(s)} className="block w-full rounded-lg border border-border px-3 py-2 text-left hover:bg-muted">{s}</button>
              ))}
            </div>
          )}
          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent>
                {m.parts.map((p, i) => {
                  if (p.type === "text") return <MessageResponse key={i}>{p.text}</MessageResponse>;
                  if (p.type === "tool-save_enquiry") {
                    const out = (p as { output?: { saved?: boolean; whatsappUrl?: string } }).output;
                    if (out?.saved && out.whatsappUrl)
                      return (
                        <a key={i} href={out.whatsappUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground">
                          <MessageCircle className="size-4" /> Send summary on WhatsApp
                        </a>
                      );
                    return <p key={i} className="text-xs text-muted-foreground">Saving your enquiry…</p>;
                  }
                  return null;
                })}
              </MessageContent>
            </Message>
          ))}
          {status === "submitted" && <p className="text-xs text-muted-foreground">Devi is typing…</p>}
          {error && <p className="text-xs text-destructive">{error.message}</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <form onSubmit={(e) => { e.preventDefault(); submit(input); }} className="flex gap-2 border-t border-border p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe what you need…"
          maxLength={2000}
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        {busy ? (
          <button type="button" onClick={stop} className="rounded-lg border border-border px-3 text-sm">Stop</button>
        ) : (
          <button type="submit" aria-label="Send" className="rounded-lg bg-primary px-3 text-primary-foreground"><Send className="size-4" /></button>
        )}
      </form>
    </>
  );
}
