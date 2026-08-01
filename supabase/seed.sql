-- ==========================================
-- SUPABASE DEVELOPMENT SEEDER
-- DIGITAL WEDDING INVITATION CMS (MVP)
-- ==========================================

-- 0. ADMIN AUTH USER
INSERT INTO auth.users (
    id, instance_id, role, aud, authenticated_role, email, encrypted_password, 
    email_confirmed_at, app_metadata, user_metadata, created_at, updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 
    'authenticated', 'authenticated', 'authenticated', 'admin@example.com', 
    crypt('password123', gen_salt('bf')), NOW(), 
    '{"provider":"email","providers":["email"]}', '{}', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO auth.identities (
    id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 
    format('{"sub":"%s","email":"%s"}', '00000000-0000-0000-0000-000000000001', 'admin@example.com')::jsonb, 
    'email', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), NOW()
) ON CONFLICT (provider, provider_id) DO NOTHING;

-- 1. PROFILE
INSERT INTO profiles (id, full_name, avatar_url) VALUES 
('00000000-0000-0000-0000-000000000001', 'System Administrator', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin')
ON CONFLICT (id) DO NOTHING;

-- 2. INVITATIONS
-- Invitation 1: Published
-- Invitation 2: Draft
INSERT INTO invitations (id, user_id, title, slug, theme, status, locale, music_auto_play) VALUES 
('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000001', 'Romeo & Juliet Wedding', 'romeo-juliet', 'darsana', 'published', 'id-ID', true),
('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000001', 'Draft Wedding', 'draft-wedding', 'darsana', 'draft', 'id-ID', false)
ON CONFLICT (id) DO NOTHING;

-- 3. DRAFTS
INSERT INTO drafts (invitation_id, payload) VALUES 
('11111111-1111-1111-1111-111111111111', '{"greeting": "Salam Hangat"}'),
('22222222-2222-2222-2222-222222222222', '{"greeting": "Draft Greeting"}')
ON CONFLICT (invitation_id) DO NOTHING;

-- 4. COUPLES
INSERT INTO couples (invitation_id, role, name, full_name, father_name, mother_name, instagram, photo_url) VALUES 
('11111111-1111-1111-1111-111111111111', 'groom', 'Romeo', 'Romeo Montague', 'Lord Montague', 'Lady Montague', '@romeo', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'),
('11111111-1111-1111-1111-111111111111', 'bride', 'Juliet', 'Juliet Capulet', 'Lord Capulet', 'Lady Capulet', '@juliet', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400')
ON CONFLICT (invitation_id, role) DO NOTHING;

-- 5. EVENTS
INSERT INTO events (invitation_id, title, date, start_time, end_time, location_name, address, google_maps_url, is_main_event) VALUES 
('11111111-1111-1111-1111-111111111111', 'Akad Nikah', '2024-12-01', '08:00:00', '10:00:00', 'Masjid Raya', 'Jl. Cinta No.1', 'https://maps.google.com', false),
('11111111-1111-1111-1111-111111111111', 'Resepsi', '2024-12-01', '11:00:00', '15:00:00', 'Gedung Serbaguna', 'Jl. Bahagia No.2', 'https://maps.google.com', true)
ON CONFLICT DO NOTHING;

-- 6. STORIES
INSERT INTO stories (invitation_id, title, date_text, description, display_order) VALUES 
('11111111-1111-1111-1111-111111111111', 'First Meet', 'January 2020', 'We met at a coffee shop.', 1),
('11111111-1111-1111-1111-111111111111', 'Relationship', 'February 2021', 'Officially dating.', 2),
('11111111-1111-1111-1111-111111111111', 'Engagement', 'December 2023', 'He proposed!', 3)
ON CONFLICT DO NOTHING;

-- 7. GALLERY
INSERT INTO gallery (invitation_id, url, caption, display_order) VALUES 
('11111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', 'Prewedding 1', 1),
('11111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', 'Prewedding 2', 2),
('11111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800', 'Prewedding 3', 3),
('11111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1583939000240-690b63359d9c?w=800', 'Prewedding 4', 4)
ON CONFLICT DO NOTHING;

-- 8. GIFTS
INSERT INTO gifts (invitation_id, bank_name, account_number, account_name, is_ewallet, qr_code_url) VALUES 
('11111111-1111-1111-1111-111111111111', 'BCA', '1234567890', 'Romeo Montague', false, null),
('11111111-1111-1111-1111-111111111111', 'Gopay', '081234567890', 'Juliet Capulet', true, 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=gopay')
ON CONFLICT DO NOTHING;

-- 9. GUESTS
INSERT INTO guests (id, invitation_id, name, phone_number, slug, max_pax) VALUES 
('33333333-3333-3333-3333-333333333331', '11111111-1111-1111-1111-111111111111', 'John Doe', '08111111111', 'john-doe', 2),
('33333333-3333-3333-3333-333333333332', '11111111-1111-1111-1111-111111111111', 'Jane Smith', '08222222222', 'jane-smith', 1),
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Budi Santoso', '08333333333', 'budi-santoso', 4)
ON CONFLICT (invitation_id, slug) DO NOTHING;

-- 10. RSVPS
INSERT INTO rsvps (guest_id, status, attending_pax) VALUES 
('33333333-3333-3333-3333-333333333331', 'attending', 2),
('33333333-3333-3333-3333-333333333332', 'pending', 1),
('33333333-3333-3333-3333-333333333333', 'declined', 0)
ON CONFLICT (guest_id) DO NOTHING;

-- 11. WISHES
INSERT INTO wishes (invitation_id, guest_name, message) VALUES 
('11111111-1111-1111-1111-111111111111', 'John Doe', 'Happy wedding!'),
('11111111-1111-1111-1111-111111111111', 'Budi Santoso', 'Semoga samawa ya!'),
('11111111-1111-1111-1111-111111111111', 'Anonim', 'Selamat menempuh hidup baru.')
ON CONFLICT DO NOTHING;

-- 12. MEDIA_ASSETS
INSERT INTO media_assets (invitation_id, bucket, storage_path, public_url, file_name, mime_type, file_size, media_type) VALUES 
('11111111-1111-1111-1111-111111111111', 'invitation-gallery', '11111111-1111-1111-1111-111111111111/photo1.jpg', 'https://example.com/photo1.jpg', 'photo1.jpg', 'image/jpeg', 102400, 'image'),
('11111111-1111-1111-1111-111111111111', 'invitation-media', '11111111-1111-1111-1111-111111111111/music.mp3', 'https://example.com/music.mp3', 'music.mp3', 'audio/mpeg', 2048000, 'audio'),
('11111111-1111-1111-1111-111111111111', 'invitation-gifts', '11111111-1111-1111-1111-111111111111/qr.png', 'https://example.com/qr.png', 'qr.png', 'image/png', 51200, 'qr')
ON CONFLICT (bucket, storage_path) DO NOTHING;
