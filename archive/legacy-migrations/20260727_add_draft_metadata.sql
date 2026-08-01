-- Add draft metadata columns to invitations table
ALTER TABLE invitations
ADD COLUMN IF NOT EXISTS draft_version INTEGER NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS draft_status VARCHAR(50) NOT NULL DEFAULT 'draft',
ADD COLUMN IF NOT EXISTS draft_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS draft_updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create a trigger to automatically update draft_updated_at when draft_data changes
CREATE OR REPLACE FUNCTION update_draft_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    -- Only update timestamp if draft fields actually changed
    IF NEW.draft_data IS DISTINCT FROM OLD.draft_data OR 
       NEW.draft_status IS DISTINCT FROM OLD.draft_status OR
       NEW.draft_version IS DISTINCT FROM OLD.draft_version THEN
        NEW.draft_updated_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS update_invitations_draft_modtime ON invitations;
CREATE TRIGGER update_invitations_draft_modtime
    BEFORE UPDATE ON invitations 
    FOR EACH ROW EXECUTE FUNCTION update_draft_modified_column();
