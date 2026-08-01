-- Rename existing status column to rsvp_status
ALTER TABLE guests RENAME COLUMN status TO rsvp_status;

-- The rsvp_status type already exists as ENUM ('pending', 'attending', 'declined').
-- Let's add 'accepted' just in case.
ALTER TYPE rsvp_status ADD VALUE IF NOT EXISTS 'accepted';

-- Create guest_category ENUM
DO $$ BEGIN
    CREATE TYPE guest_category AS ENUM (
        'family',
        'friend',
        'coworker',
        'vip',
        'vendor',
        'general'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create guest_status ENUM
DO $$ BEGIN
    CREATE TYPE guest_status AS ENUM (
        'active',
        'inactive',
        'blocked'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add new columns
ALTER TABLE guests 
ADD COLUMN IF NOT EXISTS category guest_category NOT NULL DEFAULT 'general',
ADD COLUMN IF NOT EXISTS guest_status guest_status NOT NULL DEFAULT 'active';
