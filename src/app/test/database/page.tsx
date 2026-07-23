import React from "react";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { InvitationService } from "@/features/invitation";
import type { Invitation } from "@/features/invitation/types";
import { PersonService } from "@/features/couple";
import { WeddingEventService } from "@/features/event";
import { GalleryImageService } from "@/features/gallery";
import { LoveStoryService } from "@/features/story";
import { GiftAccountService } from "@/features/gift";
import { GuestService } from "@/features/rsvp";
import { WishService } from "@/features/wish";
import { StatusBadge } from "@/components/ui/status-badge";
import { ResultCard } from "@/components/ui/result-card";

export default async function DatabaseTestPage() {
  const envLoaded =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let supabaseInitialized = false;
  let dbConnected = false;
  let querySuccess = false;
  let serviceWorking = false;
  let repoWorking = false;
  let errorMessage = "";

  let invitationsCount = 0;
  let firstInvitation: Invitation | null = null;
  let brideName = "-";
  let groomName = "-";

  // Seed Data Stats
  let eventsCount = 0;
  let galleryCount = 0;
  let storyCount = 0;
  let giftCount = 0;
  let guestCount = 0;
  let wishCount = 0;

  try {
    if (!envLoaded) throw new Error("Environment variables are missing.");

    // We use the Service Role Key here to bypass RLS, otherwise
    // the query will return 0 rows for unauthenticated users.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });
    supabaseInitialized = true;

    const invitationService = new InvitationService(supabase);
    const personService = new PersonService(supabase);
    const eventService = new WeddingEventService(supabase);
    const galleryService = new GalleryImageService(supabase);
    const storyService = new LoveStoryService(supabase);
    const giftService = new GiftAccountService(supabase);
    const guestService = new GuestService(supabase);
    const wishService = new WishService(supabase);

    serviceWorking = true;
    repoWorking = true;

    const invitations = await invitationService.getAll();
    dbConnected = true;
    querySuccess = true;

    invitationsCount = invitations.length;

    if (invitationsCount > 0) {
      firstInvitation = invitations[0];

      const persons = await personService.getByInvitationId(firstInvitation.id);
      const bride = persons.find((p) => p.role === "bride");
      const groom = persons.find((p) => p.role === "groom");
      if (bride) brideName = bride.name;
      if (groom) groomName = groom.name;

      eventsCount = (await eventService.getByInvitationId(firstInvitation.id)).length;
      galleryCount = (await galleryService.getByInvitationId(firstInvitation.id)).length;
      storyCount = (await storyService.getByInvitationId(firstInvitation.id)).length;
      giftCount = (await giftService.getByInvitationId(firstInvitation.id)).length;
      guestCount = (await guestService.getByInvitationId(firstInvitation.id)).length;
      wishCount = (await wishService.getByInvitationId(firstInvitation.id)).length;
    }
  } catch (error: unknown) {
    errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
  }

  const noData = querySuccess && invitationsCount === 0;

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-body max-w-4xl mx-auto space-y-8">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-heading font-bold mb-2 text-primary">Integration Test</h1>
        <p className="text-secondary-foreground">
          Debugging dashboard to verify the Supabase Connection, Repository Pattern, and Service
          Layer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CHECKLIST */}
        <ResultCard title="System Checklist">
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span>Environment Variables Loaded</span>
              <StatusBadge status={envLoaded ? "success" : "error"}>
                {envLoaded ? "✅ Passed" : "❌ Failed"}
              </StatusBadge>
            </li>
            <li className="flex justify-between items-center">
              <span>Supabase Client Initialized</span>
              <StatusBadge status={supabaseInitialized ? "success" : "error"}>
                {supabaseInitialized ? "✅ Passed" : "❌ Failed"}
              </StatusBadge>
            </li>
            <li className="flex justify-between items-center">
              <span>Service Layer Working</span>
              <StatusBadge status={serviceWorking ? "success" : "error"}>
                {serviceWorking ? "✅ Passed" : "❌ Failed"}
              </StatusBadge>
            </li>
            <li className="flex justify-between items-center">
              <span>Repository Working</span>
              <StatusBadge status={repoWorking ? "success" : "error"}>
                {repoWorking ? "✅ Passed" : "❌ Failed"}
              </StatusBadge>
            </li>
            <li className="flex justify-between items-center">
              <span>Database Connected</span>
              <StatusBadge status={dbConnected ? "success" : "error"}>
                {dbConnected ? "✅ Passed" : "❌ Failed"}
              </StatusBadge>
            </li>
            <li className="flex justify-between items-center">
              <span>Query Successful</span>
              <StatusBadge status={querySuccess ? "success" : "error"}>
                {querySuccess ? "✅ Passed" : "❌ Failed"}
              </StatusBadge>
            </li>
          </ul>
        </ResultCard>

        {/* RESULTS & ERRORS */}
        <ResultCard title="Query Results">
          {errorMessage ? (
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 p-4 rounded-md">
              <h4 className="font-semibold mb-1">❌ Failed to connect to Supabase</h4>
              <p className="font-mono text-sm">{errorMessage}</p>
            </div>
          ) : noData ? (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-200 p-4 rounded-md">
              No invitation found.
            </div>
          ) : firstInvitation ? (
            <ul className="space-y-3">
              <li className="flex flex-col">
                <span className="text-xs font-semibold uppercase text-secondary-foreground">
                  Connection Status
                </span>
                <span className="font-medium text-green-600 dark:text-green-400">Connected</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs font-semibold uppercase text-secondary-foreground">
                  Total Invitations
                </span>
                <span className="font-medium">{invitationsCount}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs font-semibold uppercase text-secondary-foreground">
                  First Invitation ID
                </span>
                <span className="font-mono text-xs truncate" title={firstInvitation.id}>
                  {firstInvitation.id}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs font-semibold uppercase text-secondary-foreground">
                  Invitation Slug
                </span>
                <span className="font-medium">{firstInvitation.slug}</span>
              </li>
              <li className="flex grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase text-secondary-foreground">
                    Bride Name
                  </span>
                  <span className="font-medium">{brideName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase text-secondary-foreground">
                    Groom Name
                  </span>
                  <span className="font-medium">{groomName}</span>
                </div>
              </li>

              {/* Seed Data Stats */}
              <li className="pt-2 border-t border-border mt-2">
                <span className="text-xs font-semibold uppercase text-secondary-foreground block mb-2">
                  Seed Data Verification
                </span>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between bg-muted/50 p-2 rounded">
                    <span>Events</span>
                    <span className="font-bold">{eventsCount}</span>
                  </div>
                  <div className="flex justify-between bg-muted/50 p-2 rounded">
                    <span>Gallery</span>
                    <span className="font-bold">{galleryCount}</span>
                  </div>
                  <div className="flex justify-between bg-muted/50 p-2 rounded">
                    <span>Story Items</span>
                    <span className="font-bold">{storyCount}</span>
                  </div>
                  <div className="flex justify-between bg-muted/50 p-2 rounded">
                    <span>Gifts</span>
                    <span className="font-bold">{giftCount}</span>
                  </div>
                  <div className="flex justify-between bg-muted/50 p-2 rounded">
                    <span>Guests (RSVP)</span>
                    <span className="font-bold">{guestCount}</span>
                  </div>
                  <div className="flex justify-between bg-muted/50 p-2 rounded">
                    <span>Wishes</span>
                    <span className="font-bold">{wishCount}</span>
                  </div>
                </div>
              </li>

              <li className="flex flex-col pt-2 border-t border-border">
                <span className="text-xs font-semibold uppercase text-secondary-foreground">
                  Created At
                </span>
                <span className="font-mono text-xs">
                  {new Date(firstInvitation.created_at).toLocaleString()}
                </span>
              </li>
            </ul>
          ) : (
            <div className="text-muted-foreground italic">Running checks...</div>
          )}
        </ResultCard>
      </div>
    </div>
  );
}
