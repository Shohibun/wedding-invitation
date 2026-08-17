"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionCover } from "../sections/SectionCover";
import { SectionCouple } from "../sections/SectionCouple";
import { SectionEvents } from "../sections/SectionEvents";
import { SectionStory } from "../sections/SectionStory";
import { SectionGallery } from "../sections/SectionGallery";
import { SectionGifts } from "../sections/SectionGifts";
import { SectionSettings } from "../sections/SectionSettings";

export function EditorSidebar() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="p-4 border-b shrink-0 bg-surface">
        <h2 className="font-semibold text-text">Invitation Editor</h2>
        <p className="text-xs text-textMuted">Modify sections and customize design</p>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 p-4">
        <Accordion className="w-full" defaultValue={["cover"]}>
          <AccordionItem value="cover">
            <AccordionTrigger>Cover & Background Music</AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <SectionCover />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="couple">
            <AccordionTrigger>Couple</AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <SectionCouple />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="events">
            <AccordionTrigger>Events</AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <SectionEvents />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="story">
            <AccordionTrigger>Love Story</AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <SectionStory />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="gallery">
            <AccordionTrigger>Gallery</AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <SectionGallery />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="gifts">
            <AccordionTrigger>Gifts (Digital Envelope)</AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <SectionGifts />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="settings">
            <AccordionTrigger>Design Settings</AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <SectionSettings />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
