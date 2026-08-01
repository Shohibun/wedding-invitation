-- Add access_token and tracking fields to guests table

ALTER TABLE guests
  ADD COLUMN access_token UUID DEFAULT gen_random_uuid() NOT NULL,
  ADD COLUMN visit_count INT DEFAULT 0 NOT NULL,
  ADD COLUMN first_visited_at TIMESTAMPTZ,
  ADD COLUMN last_visited_at TIMESTAMPTZ;

-- Add index on slug for fast resolution
CREATE INDEX IF NOT EXISTS guests_slug_idx ON guests(slug);
