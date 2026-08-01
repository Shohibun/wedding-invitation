-- ==========================================
-- INVITATION ACTIVITIES (Audit Trail)
-- ==========================================
CREATE TABLE invitation_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(255),
    
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for efficient querying by invitation, time, and user
CREATE INDEX idx_invitation_activities_invitation_id ON invitation_activities(invitation_id);
CREATE INDEX idx_invitation_activities_created_at ON invitation_activities(created_at DESC);
CREATE INDEX idx_invitation_activities_user_id ON invitation_activities(user_id);

-- Note: No updated_at trigger here since activities are strictly append-only.
