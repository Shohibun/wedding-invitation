-- 20260727_add_analytics_events.sql
-- Creates the analytics_events table and necessary indexes.

CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL, -- Logical link, no hard FK enforced to allow analytics without crashing if inv is deleted
    guest_id UUID, -- Nullable (for anonymous visitors)
    session_id UUID NOT NULL,
    event_type VARCHAR(255) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb NOT NULL,
    device VARCHAR(100),
    browser VARCHAR(100),
    os VARCHAR(100),
    country VARCHAR(100),
    city VARCHAR(100),
    referrer TEXT,
    path TEXT,
    duration INTEGER,
    ip_hash VARCHAR(255),
    user_agent TEXT,
    viewport_width INTEGER,
    viewport_height INTEGER,
    language VARCHAR(50),
    timezone VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Note: Append-only design. No updated_at column or triggers exist.

-- Create highly optimized indexes for reporting and aggregations
CREATE INDEX IF NOT EXISTS idx_analytics_invitation_id ON public.analytics_events(invitation_id);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_guest_id ON public.analytics_events(guest_id) WHERE guest_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics_events(created_at);

-- Combined indexes for common queries (e.g. counting events per invitation over time)
CREATE INDEX IF NOT EXISTS idx_analytics_invitation_time ON public.analytics_events(invitation_id, created_at);
