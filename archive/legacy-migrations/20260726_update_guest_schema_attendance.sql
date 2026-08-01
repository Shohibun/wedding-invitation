-- Add 'maybe' to rsvp_status if it doesn't exist
ALTER TYPE rsvp_status ADD VALUE IF NOT EXISTS 'maybe';

-- Create attendance_status ENUM
DO $$ BEGIN
    CREATE TYPE attendance_status AS ENUM (
        'not_checked_in',
        'checked_in',
        'checked_out'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add new column to guests table
ALTER TABLE guests 
ADD COLUMN IF NOT EXISTS attendance_status attendance_status NOT NULL DEFAULT 'not_checked_in';
