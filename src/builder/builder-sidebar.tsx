"use client";

import { useBuilder } from "./builder-hooks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings2, Layers } from "lucide-react";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Lazy load editors to improve initial bundle size
const HeroEditor = dynamic(() => import("./editors/hero-editor").then((mod) => mod.HeroEditor), {
  loading: () => (
    <div className="p-8 flex justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  ),
});
const CoupleEditor = dynamic(
  () => import("./editors/couple-editor").then((mod) => mod.CoupleEditor),
  {
    loading: () => (
      <div className="p-8 flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    ),
  }
);
const EventEditor = dynamic(() => import("./editors/event-editor").then((mod) => mod.EventEditor), {
  loading: () => (
    <div className="p-8 flex justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  ),
});
const StoryEditor = dynamic(() => import("./editors/story-editor").then((mod) => mod.StoryEditor), {
  loading: () => (
    <div className="p-8 flex justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  ),
});
const GalleryEditor = dynamic(
  () => import("./editors/gallery-editor").then((mod) => mod.GalleryEditor),
  {
    loading: () => (
      <div className="p-8 flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    ),
  }
);
const GiftEditor = dynamic(() => import("./editors/gift-editor").then((mod) => mod.GiftEditor), {
  loading: () => (
    <div className="p-8 flex justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  ),
});
const RSVPEditor = dynamic(() => import("./editors/rsvp-editor").then((mod) => mod.RSVPEditor), {
  loading: () => (
    <div className="p-8 flex justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  ),
});
const WishEditor = dynamic(() => import("./editors/wish-editor").then((mod) => mod.WishEditor), {
  loading: () => (
    <div className="p-8 flex justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  ),
});
const FooterEditor = dynamic(
  () => import("./editors/footer-editor").then((mod) => mod.FooterEditor),
  {
    loading: () => (
      <div className="p-8 flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    ),
  }
);

export function BuilderSidebar() {
  const { state } = useBuilder();

  // Hide completely in preview mode
  if (state.previewMode) return null;

  return (
    <aside
      className={`border-r bg-background flex flex-col h-full overflow-hidden transition-all duration-300 ${
        state.sidebarCollapsed ? "w-0 border-r-0 opacity-0" : "w-80 opacity-100"
      }`}
    >
      <div className="h-14 border-b flex items-center px-4 font-semibold shrink-0 gap-2">
        <Settings2 className="h-4 w-4" />
        Editor Panel
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 flex flex-col gap-4 text-sm text-muted-foreground">
          {!state.selectedSection && (
            <div className="border border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground m-4">
              <Layers className="h-8 w-8 text-muted-foreground/50" />
              <p>Select a section in the preview to edit its properties.</p>
            </div>
          )}

          {state.selectedSection === "hero" && <HeroEditor />}
          {state.selectedSection === "couple" && <CoupleEditor />}
          {state.selectedSection === "events" && <EventEditor />}
          {state.selectedSection === "story" && <StoryEditor />}
          {state.selectedSection === "gallery" && <GalleryEditor />}
          {state.selectedSection === "gift" && <GiftEditor />}
          {state.selectedSection === "rsvp" && <RSVPEditor />}
          {state.selectedSection === "wish" && <WishEditor />}
          {state.selectedSection === "footer" && <FooterEditor />}

          <div className="bg-muted/50 rounded-lg p-4 m-4">
            <p className="font-medium text-foreground mb-1">State Dump</p>
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify(
                {
                  section: state.selectedSection,
                  field: state.selectedField,
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
