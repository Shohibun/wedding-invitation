-- ==========================================
-- MEDIA ASSETS SCHEMA
-- ==========================================

-- 1. ENUMS
CREATE TYPE asset_media_type AS ENUM ('cover', 'hero', 'couple', 'gallery', 'story', 'gift_qr', 'music');

-- 2. MEDIA ASSETS TABLE
CREATE TABLE media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    bucket VARCHAR(50) NOT NULL,
    storage_path TEXT NOT NULL,
    media_type asset_media_type NOT NULL,
    
    mime_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    
    -- Optional Metadata
    width INTEGER,
    height INTEGER,
    duration INTEGER,
    alt_text VARCHAR(255),
    
    sort_order INTEGER NOT NULL DEFAULT 0,
    uploaded_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Ensure paths are unique across the entire system
    UNIQUE(bucket, storage_path)
);
CREATE INDEX idx_media_assets_invitation_id ON media_assets(invitation_id);
CREATE INDEX idx_media_assets_media_type ON media_assets(media_type);

-- Trigger for updated_at
CREATE TRIGGER update_media_assets_modtime
    BEFORE UPDATE ON media_assets FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- 3. ROW LEVEL SECURITY
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view media_assets belonging to invitations they own
CREATE POLICY "Users can view own media assets"
    ON media_assets FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM invitations i 
            WHERE i.id = media_assets.invitation_id 
            AND i.user_id = auth.uid()
        )
    );

-- Policy: Users can insert media_assets to invitations they own
CREATE POLICY "Users can insert own media assets"
    ON media_assets FOR INSERT
    WITH CHECK (
        uploaded_by = auth.uid() AND
        EXISTS (
            SELECT 1 FROM invitations i 
            WHERE i.id = media_assets.invitation_id 
            AND i.user_id = auth.uid()
        )
    );

-- Policy: Users can update media_assets belonging to invitations they own (e.g., sort_order)
CREATE POLICY "Users can update own media assets"
    ON media_assets FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM invitations i 
            WHERE i.id = media_assets.invitation_id 
            AND i.user_id = auth.uid()
        )
    );

-- Policy: Users can delete media_assets belonging to invitations they own
CREATE POLICY "Users can delete own media assets"
    ON media_assets FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM invitations i 
            WHERE i.id = media_assets.invitation_id 
            AND i.user_id = auth.uid()
        )
    );
