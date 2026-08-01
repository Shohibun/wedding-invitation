-- Add draft_data JSONB column to invitations table
ALTER TABLE invitations
ADD COLUMN draft_data JSONB DEFAULT '{}'::jsonb;
