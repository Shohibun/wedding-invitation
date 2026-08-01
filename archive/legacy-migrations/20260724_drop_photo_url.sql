-- Drop photo_url from persons as media_assets is the single source of truth
ALTER TABLE persons DROP COLUMN IF EXISTS photo_url;
