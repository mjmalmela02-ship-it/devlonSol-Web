CREATE TABLE public.chat_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_token text NOT NULL,
  title text NOT NULL DEFAULT 'New chat',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX chat_threads_visitor_idx ON public.chat_threads(visitor_token, updated_at DESC);
CREATE TABLE public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES public.chat_threads(id) ON DELETE CASCADE,
  role text NOT NULL,
  message jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX chat_messages_thread_idx ON public.chat_messages(thread_id, created_at);
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid REFERENCES public.chat_threads(id) ON DELETE SET NULL,
  name text NOT NULL, phone text, email text, service text,
  details text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.print_quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  print_type text NOT NULL, size text NOT NULL, quantity integer NOT NULL,
  finishing text NOT NULL, notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.chat_threads, public.chat_messages, public.leads, public.print_quote_requests TO service_role;
ALTER TABLE public.chat_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.print_quote_requests ENABLE ROW LEVEL SECURITY;