import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import {
  seedInvitation,
  seedCouple,
  seedEvent,
  seedGallery,
  seedStory,
  seedGift,
  seedRsvp,
  seedWish,
} from "./index";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or keys");
  process.exit(1);
}

// Ensure it bypasses RLS if it's using the service role key
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  console.log("Database Seed Started");

  let userId = process.env.SEED_USER_ID || "";

  if (!userId) {
    const email = "seed.wedding.invitation@gmail.com";
    const password = "SuperSecretSeedPassword123!";

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !signInData.user) {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        console.error("Failed to create or login seed user:", signUpError.message);
        if (signUpError.message.includes("rate limit")) {
          console.error("\n======================================================");
          console.error("🚨 Supabase Auth Rate Limit Exceeded!");
          console.error("Supabase membatasi pembuatan user baru via API secara beruntun.");
          console.error("Solusi:");
          console.error("1. Buka Supabase Dashboard > Authentication > Users > Add User.");
          console.error('2. Buat user sembarang, lalu Copy kolom "User UID"-nya.');
          console.error("3. Buka file .env.local dan tambahkan baris ini:");
          console.error('   SEED_USER_ID="paste-uid-disini"');
          console.error("4. Jalankan ulang npm run db:seed");
          console.error("======================================================\n");
        }
        process.exit(1);
      }
      userId = signUpData.user!.id;
    } else {
      userId = signInData.user.id;
    }
  } else {
    console.log("Using SEED_USER_ID from .env.local:", userId);
  }

  try {
    const invitation = await seedInvitation(supabase, userId);
    console.log("Invitation Created");

    await seedCouple(supabase, invitation.id);
    console.log("Couple Created");

    await seedEvent(supabase, invitation.id);
    console.log("Events Created");

    await seedGallery(supabase, invitation.id);
    console.log("Gallery Created");

    await seedStory(supabase, invitation.id);
    console.log("Story Created");

    await seedGift(supabase, invitation.id);
    console.log("Gift Created");

    await seedRsvp(supabase, invitation.id);
    console.log("RSVP Created");

    await seedWish(supabase, invitation.id);
    console.log("Wish Created");

    console.log("Database Seed Finished");
  } catch (error) {
    console.error("Seed Error:", error);
  }
}

main();
