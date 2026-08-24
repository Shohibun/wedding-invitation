-- Add title column to invitations table
ALTER TABLE invitations
ADD COLUMN title VARCHAR(255) NOT NULL DEFAULT 'Untitled Invitation';
