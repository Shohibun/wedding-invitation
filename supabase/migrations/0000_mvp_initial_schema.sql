-- ==========================================
-- SUPABASE POSTGRESQL DATABASE SCHEMA
-- DIGITAL WEDDING INVITATION CMS (MVP)
-- ==========================================

-- ==========================================
-- EXTENSIONS
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- ENUMS
-- ==========================================
CREATE TYPE couple_role AS ENUM ('groom', 'bride');
CREATE TYPE invitation_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE rsvp_status AS ENUM ('pending', 'attending', 'declined');
CREATE TYPE media_type AS ENUM ('image', 'audio', 'video', 'qr');

-- ==========================================
-- FUNCTIONS
-- ==========================================
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- TABLES
-- ==========================================
-- 1. PROFILES
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_profiles_modtime
    BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- 2. INVITATIONS
CREATE TABLE invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    theme VARCHAR(100) NOT NULL DEFAULT 'darsana',
    status invitation_status NOT NULL DEFAULT 'draft',
    locale VARCHAR(20) NOT NULL DEFAULT 'id-ID',
    music_auto_play BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_invitations_user_id ON invitations(user_id);
CREATE INDEX idx_invitations_slug ON invitations(slug);

CREATE TRIGGER update_invitations_modtime
    BEFORE UPDATE ON invitations FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- 3. DRAFTS
CREATE TABLE drafts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL UNIQUE REFERENCES invitations(id) ON DELETE CASCADE,
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_drafts_invitation_id ON drafts(invitation_id);

CREATE TRIGGER update_drafts_modtime
    BEFORE UPDATE ON drafts FOR EACH ROW EXECUTE FUNCTION update_modified_column();
-- 4. COUPLES
CREATE TABLE couples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    role couple_role NOT NULL,
    name VARCHAR(100) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    mother_name VARCHAR(255),
    instagram VARCHAR(100),
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(invitation_id, role)
);
CREATE INDEX idx_couples_invitation_id ON couples(invitation_id);
CREATE TRIGGER update_couples_modtime
    BEFORE UPDATE ON couples FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- 5. EVENTS
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    title VARCHAR(100),
    date DATE,
    start_time TIME,
    end_time TIME,
    location_name VARCHAR(255),
    address TEXT,
    google_maps_url TEXT,
    is_main_event BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_events_invitation_id ON events(invitation_id);
CREATE TRIGGER update_events_modtime
    BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- 6. STORIES
CREATE TABLE stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    title VARCHAR(255),
    date_text VARCHAR(100),
    description TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_stories_invitation_id ON stories(invitation_id);
CREATE TRIGGER update_stories_modtime
    BEFORE UPDATE ON stories FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- 7. GALLERY
CREATE TABLE gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    url TEXT,
    caption TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_gallery_invitation_id ON gallery(invitation_id);
CREATE TRIGGER update_gallery_modtime
    BEFORE UPDATE ON gallery FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- 8. GIFTS
CREATE TABLE gifts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    bank_name VARCHAR(100),
    account_number VARCHAR(100),
    account_name VARCHAR(255),
    is_ewallet BOOLEAN DEFAULT false,
    qr_code_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_gifts_invitation_id ON gifts(invitation_id);
CREATE TRIGGER update_gifts_modtime
    BEFORE UPDATE ON gifts FOR EACH ROW EXECUTE FUNCTION update_modified_column();
-- 9. GUESTS
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(30),
    slug VARCHAR(255) NOT NULL,
    max_pax INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(invitation_id, slug)
);
CREATE INDEX idx_guests_invitation_id ON guests(invitation_id);
CREATE INDEX idx_guests_slug ON guests(slug);
CREATE TRIGGER update_guests_modtime
    BEFORE UPDATE ON guests FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- 10. RSVPS
CREATE TABLE rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id UUID NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
    status rsvp_status NOT NULL DEFAULT 'pending',
    attending_pax INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(guest_id)
);
CREATE INDEX idx_rsvps_guest_id ON rsvps(guest_id);

-- 11. WISHES
CREATE TABLE wishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    guest_name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_wishes_invitation_id ON wishes(invitation_id);
-- 12. MEDIA_ASSETS
CREATE TABLE media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    bucket VARCHAR(100) NOT NULL,
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100),
    file_size BIGINT,
    media_type media_type NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(bucket, storage_path)
);
CREATE INDEX idx_media_assets_invitation_id ON media_assets(invitation_id);
CREATE INDEX idx_media_assets_media_type ON media_assets(media_type);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================
-- ENABLE RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- ADMIN POLICIES (FULL CRUD)
CREATE POLICY "Admin full access profiles" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Admin full access invitations" ON invitations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admin full access drafts" ON drafts FOR ALL USING (EXISTS (SELECT 1 FROM invitations WHERE id = drafts.invitation_id AND user_id = auth.uid()));
CREATE POLICY "Admin full access couples" ON couples FOR ALL USING (EXISTS (SELECT 1 FROM invitations WHERE id = couples.invitation_id AND user_id = auth.uid()));
CREATE POLICY "Admin full access events" ON events FOR ALL USING (EXISTS (SELECT 1 FROM invitations WHERE id = events.invitation_id AND user_id = auth.uid()));
CREATE POLICY "Admin full access stories" ON stories FOR ALL USING (EXISTS (SELECT 1 FROM invitations WHERE id = stories.invitation_id AND user_id = auth.uid()));
CREATE POLICY "Admin full access gallery" ON gallery FOR ALL USING (EXISTS (SELECT 1 FROM invitations WHERE id = gallery.invitation_id AND user_id = auth.uid()));
CREATE POLICY "Admin full access gifts" ON gifts FOR ALL USING (EXISTS (SELECT 1 FROM invitations WHERE id = gifts.invitation_id AND user_id = auth.uid()));
CREATE POLICY "Admin full access guests" ON guests FOR ALL USING (EXISTS (SELECT 1 FROM invitations WHERE id = guests.invitation_id AND user_id = auth.uid()));
CREATE POLICY "Admin full access rsvps" ON rsvps FOR ALL USING (EXISTS (SELECT 1 FROM guests JOIN invitations ON guests.invitation_id = invitations.id WHERE guests.id = rsvps.guest_id AND invitations.user_id = auth.uid()));
CREATE POLICY "Admin full access wishes" ON wishes FOR ALL USING (EXISTS (SELECT 1 FROM invitations WHERE id = wishes.invitation_id AND user_id = auth.uid()));
CREATE POLICY "Admin full access media_assets" ON media_assets FOR ALL USING (EXISTS (SELECT 1 FROM invitations WHERE id = media_assets.invitation_id AND user_id = auth.uid()));

-- PUBLIC READ POLICIES (Published ONLY)
CREATE POLICY "Public read published invitations" ON invitations FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published couples" ON couples FOR SELECT USING (EXISTS (SELECT 1 FROM invitations WHERE id = couples.invitation_id AND status = 'published'));
CREATE POLICY "Public read published events" ON events FOR SELECT USING (EXISTS (SELECT 1 FROM invitations WHERE id = events.invitation_id AND status = 'published'));
CREATE POLICY "Public read published stories" ON stories FOR SELECT USING (EXISTS (SELECT 1 FROM invitations WHERE id = stories.invitation_id AND status = 'published'));
CREATE POLICY "Public read published gallery" ON gallery FOR SELECT USING (EXISTS (SELECT 1 FROM invitations WHERE id = gallery.invitation_id AND status = 'published'));
CREATE POLICY "Public read published gifts" ON gifts FOR SELECT USING (EXISTS (SELECT 1 FROM invitations WHERE id = gifts.invitation_id AND status = 'published'));
CREATE POLICY "Public read published wishes" ON wishes FOR SELECT USING (EXISTS (SELECT 1 FROM invitations WHERE id = wishes.invitation_id AND status = 'published'));

-- PUBLIC INSERT POLICIES
CREATE POLICY "Public insert rsvps" ON rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert wishes" ON wishes FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM invitations WHERE id = wishes.invitation_id AND status = 'published'));

-- ==========================================
-- STORAGE BUCKETS
-- ==========================================
INSERT INTO storage.buckets (id, name, public) VALUES 
('invitation-gallery', 'invitation-gallery', true),
('invitation-media', 'invitation-media', true),
('invitation-gifts', 'invitation-gifts', true),
('admin-avatars', 'admin-avatars', true)
ON CONFLICT (id) DO NOTHING;

-- STORAGE POLICIES
CREATE POLICY "Public read invitation-gallery" ON storage.objects FOR SELECT USING (bucket_id = 'invitation-gallery');
CREATE POLICY "Admin full access invitation-gallery" ON storage.objects FOR ALL USING (bucket_id = 'invitation-gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Public read invitation-media" ON storage.objects FOR SELECT USING (bucket_id = 'invitation-media');
CREATE POLICY "Admin full access invitation-media" ON storage.objects FOR ALL USING (bucket_id = 'invitation-media' AND auth.role() = 'authenticated');

CREATE POLICY "Public read invitation-gifts" ON storage.objects FOR SELECT USING (bucket_id = 'invitation-gifts');
CREATE POLICY "Admin full access invitation-gifts" ON storage.objects FOR ALL USING (bucket_id = 'invitation-gifts' AND auth.role() = 'authenticated');

CREATE POLICY "Public read admin-avatars" ON storage.objects FOR SELECT USING (bucket_id = 'admin-avatars');
CREATE POLICY "Admin full access admin-avatars" ON storage.objects FOR ALL USING (bucket_id = 'admin-avatars' AND auth.role() = 'authenticated');

-- ==========================================
-- TRIGGERS
-- ==========================================
-- TODO: Attach triggers to tables
