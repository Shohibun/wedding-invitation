-- ==========================================
-- PROFILES AND AUTHORIZATION SCHEMA
-- ==========================================

-- 1. ROLES
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'editor', 'viewer');

-- 2. PROFILES TABLE
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(150),
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'owner',
    preferences JSONB NOT NULL DEFAULT '{}',
    subscription VARCHAR(50) NOT NULL DEFAULT 'free',
    tenant_id UUID,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for updated_at
CREATE TRIGGER update_profiles_modtime
    BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- 3. AUTO CREATE PROFILE ON USER SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'owner');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);
