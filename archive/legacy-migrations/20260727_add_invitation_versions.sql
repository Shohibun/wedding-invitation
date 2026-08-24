-- ==========================================
-- INVITATION VERSIONS (Historical Snapshots)
-- ==========================================
CREATE TABLE invitation_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    message VARCHAR(255),
    snapshot JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Enforce uniqueness per invitation version
    UNIQUE(invitation_id, version_number)
);

-- Indexes for performance
CREATE INDEX idx_invitation_versions_invitation_id ON invitation_versions(invitation_id);
CREATE INDEX idx_invitation_versions_published_at ON invitation_versions(published_at DESC);

-- Note: We intentionally do NOT add an updated_at trigger here, 
-- because invitation_versions are append-only and strictly immutable.
