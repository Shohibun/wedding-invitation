-- Create ENUM for invitation status
CREATE TYPE invitation_status AS ENUM ('draft', 'published', 'archived');

-- Add new columns to invitations table
ALTER TABLE invitations 
ADD COLUMN status invitation_status NOT NULL DEFAULT 'draft',
ADD COLUMN published_at TIMESTAMPTZ,
ADD COLUMN is_public BOOLEAN NOT NULL DEFAULT false;

-- Create index on status for faster filtering in CMS
CREATE INDEX idx_invitations_status ON invitations(status);
