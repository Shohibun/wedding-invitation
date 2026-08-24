-- ==========================================
-- SUPABASE POSTGRESQL DATABASE SCHEMA
-- DIGITAL WEDDING INVITATION SAAS
-- ==========================================

-- 1. ENUMS
CREATE TYPE person_role AS ENUM ('groom', 'bride');
CREATE TYPE rsvp_status AS ENUM ('pending', 'attending', 'declined');
CREATE TYPE wish_status AS ENUM ('pending', 'approved', 'spam');

-- 2. UPDATED_AT TRIGGER FUNCTION
-- Automatically updates the updated_at column on row modification
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';


-- ==========================================
-- CORE TABLES
-- ==========================================

-- 3. INVITATIONS
-- Main table connecting a SaaS user to their wedding invitation
CREATE TABLE invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    theme VARCHAR(50) NOT NULL DEFAULT 'elegant',
    
    -- Features & Settings
    video_url TEXT,
    music_url TEXT,
    music_auto_play BOOLEAN NOT NULL DEFAULT TRUE,
    locale VARCHAR(10) NOT NULL DEFAULT 'id-ID',
    sections_order JSONB NOT NULL DEFAULT '["cover", "hero", "story", "event", "gallery", "countdown", "rsvp", "gift", "wish"]',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_invitations_user_id ON invitations(user_id);
CREATE INDEX idx_invitations_slug ON invitations(slug);

CREATE TRIGGER update_invitations_modtime
    BEFORE UPDATE ON invitations FOR EACH ROW EXECUTE FUNCTION update_modified_column();


-- 4. PERSONS (GROOM & BRIDE)
-- Stores details for the bride and groom linked to an invitation
CREATE TABLE persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    role person_role NOT NULL,
    
    name VARCHAR(50) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    father_name VARCHAR(100) NOT NULL,
    mother_name VARCHAR(100) NOT NULL,
    instagram_username VARCHAR(50),
    photo_url TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(invitation_id, role) -- Ensure only 1 groom and 1 bride per invitation
);
CREATE INDEX idx_persons_invitation_id ON persons(invitation_id);

CREATE TRIGGER update_persons_modtime
    BEFORE UPDATE ON persons FOR EACH ROW EXECUTE FUNCTION update_modified_column();


-- 5. EVENTS
-- e.g. Akad, Reception, After-party
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    
    title VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Jakarta',
    
    location_name VARCHAR(150) NOT NULL,
    address TEXT NOT NULL,
    google_maps_url TEXT,
    is_main_event BOOLEAN NOT NULL DEFAULT FALSE,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_events_invitation_id ON events(invitation_id);

CREATE TRIGGER update_events_modtime
    BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_modified_column();


-- 6. GALLERY IMAGES
CREATE TABLE gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption VARCHAR(255),
    display_order INTEGER NOT NULL DEFAULT 0,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_gallery_images_invitation_id ON gallery_images(invitation_id);

CREATE TRIGGER update_gallery_images_modtime
    BEFORE UPDATE ON gallery_images FOR EACH ROW EXECUTE FUNCTION update_modified_column();


-- 7. LOVE STORIES (Timeline)
CREATE TABLE love_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    
    date_text VARCHAR(100) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_love_stories_invitation_id ON love_stories(invitation_id);

CREATE TRIGGER update_love_stories_modtime
    BEFORE UPDATE ON love_stories FOR EACH ROW EXECUTE FUNCTION update_modified_column();


-- 8. GIFT ACCOUNTS (Bank / E-Wallet)
CREATE TABLE gift_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    
    bank_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(100) NOT NULL,
    account_name VARCHAR(150) NOT NULL,
    is_ewallet BOOLEAN NOT NULL DEFAULT FALSE,
    qr_code_url TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_gift_accounts_invitation_id ON gift_accounts(invitation_id);

CREATE TRIGGER update_gift_accounts_modtime
    BEFORE UPDATE ON gift_accounts FOR EACH ROW EXECUTE FUNCTION update_modified_column();


-- 9. GUESTS (RSVP & Access)
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    
    name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20),
    slug VARCHAR(255) NOT NULL,
    status rsvp_status NOT NULL DEFAULT 'pending',
    pax INTEGER NOT NULL DEFAULT 1,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(invitation_id, slug)
);
CREATE INDEX idx_guests_invitation_id ON guests(invitation_id);
CREATE INDEX idx_guests_slug ON guests(slug);

CREATE TRIGGER update_guests_modtime
    BEFORE UPDATE ON guests FOR EACH ROW EXECUTE FUNCTION update_modified_column();


-- 10. WISHES (Guestbook)
CREATE TABLE wishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    
    guest_name VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    status wish_status NOT NULL DEFAULT 'pending',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_wishes_invitation_id ON wishes(invitation_id);
CREATE INDEX idx_wishes_status ON wishes(status);

CREATE TRIGGER update_wishes_modtime
    BEFORE UPDATE ON wishes FOR EACH ROW EXECUTE FUNCTION update_modified_column();


-- ==========================================
-- SUPABASE STORAGE RECOMMENDATIONS
-- ==========================================
/*
Recommended Bucket Names to create in Supabase Storage Dashboard:

1. "invitation-assets" (Public)
   - Usage: For storing pre-wedding photos, gallery images, love story images, and groom/bride portraits.
   - Example path: /invitations/{invitation_id}/gallery/{image_name}.jpg

2. "invitation-media" (Public)
   - Usage: For background music (mp3) and short video clips.
   - Example path: /invitations/{invitation_id}/music/bg-song.mp3

3. "invitation-qr" (Public)
   - Usage: For storing E-Wallet QR Code images for the gift section.
   - Example path: /invitations/{invitation_id}/qr/{bank_name}.png
*/
