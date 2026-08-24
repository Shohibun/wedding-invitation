-- 20260728_add_visitor_sessions.sql
-- Creates the visitor_sessions table and necessary indexes.

CREATE TABLE IF NOT EXISTS public.visitor_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL,
    guest_id UUID, -- Nullable (for anonymous visitors)
    session_id UUID NOT NULL,
    started_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ,
    duration INTEGER, -- duration in seconds
    device VARCHAR(100),
    browser VARCHAR(100),
    os VARCHAR(100),
    viewport_width INTEGER,
    viewport_height INTEGER,
    language VARCHAR(50),
    timezone VARCHAR(100),
    referrer TEXT,
    entry_path TEXT,
    exit_path TEXT,
    visit_count INTEGER DEFAULT 1 NOT NULL,
    is_returning BOOLEAN DEFAULT false NOT NULL,
    ip_hash VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Note: We update visitor_sessions, so we need a trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_visitor_sessions_updated_at ON public.visitor_sessions;
CREATE TRIGGER set_visitor_sessions_updated_at
    BEFORE UPDATE ON public.visitor_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create highly optimized indexes
CREATE INDEX IF NOT EXISTS idx_visitor_session_invitation_id ON public.visitor_sessions(invitation_id);
CREATE INDEX IF NOT EXISTS idx_visitor_session_session_id ON public.visitor_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_session_guest_id ON public.visitor_sessions(guest_id) WHERE guest_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_visitor_session_started_at ON public.visitor_sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_visitor_session_updated_at ON public.visitor_sessions(updated_at);
