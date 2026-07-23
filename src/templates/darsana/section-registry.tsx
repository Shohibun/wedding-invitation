import * as React from "react";
import dynamic from "next/dynamic";
import { SectionId, RegisteredSection } from "../core/types";
import { FallbackSection } from "../core/fallback-section";

export const darsanaSectionRegistry: Record<SectionId, RegisteredSection> = {
  cover: {
    id: "cover",
    displayName: "Cover",
    component: dynamic(() => import("./sections/cover"), {
      loading: () => <FallbackSection id="cover" />,
      ssr: true,
    }),
    enabled: true,
    lazy: true,
  },
  hero: {
    id: "hero",
    displayName: "Hero",
    component: dynamic(() => import("./sections/hero"), {
      loading: () => <FallbackSection id="hero" />,
      ssr: true,
    }),
    enabled: true,
    lazy: true,
  },
  quote: {
    id: "quote",
    displayName: "Quote",
    component: dynamic(() => import("./sections/quote"), {
      loading: () => <FallbackSection id="quote" />,
      ssr: true,
    }),
    enabled: true,
    lazy: true,
  },
  couple: {
    id: "couple",
    displayName: "Couple",
    component: dynamic(() => import("./sections/couple"), {
      loading: () => <FallbackSection id="couple" />,
      ssr: true,
    }),
    enabled: true,
    lazy: true,
  },
  countdown: {
    id: "countdown",
    displayName: "Countdown",
    component: dynamic(() => import("./sections/countdown"), {
      loading: () => <FallbackSection id="countdown" />,
      ssr: true,
    }),
    enabled: true,
    lazy: true,
  },
  event: {
    id: "event",
    displayName: "Event Details",
    component: dynamic(() => import("./sections/event"), {
      loading: () => <FallbackSection id="event" />,
      ssr: true,
    }),
    enabled: true,
    lazy: true,
  },
  gallery: {
    id: "gallery",
    displayName: "Gallery",
    component: dynamic(() => import("./sections/gallery"), {
      loading: () => <FallbackSection id="gallery" />,
      ssr: true,
    }),
    enabled: true,
    lazy: true,
  },
  story: {
    id: "story",
    displayName: "Love Story",
    component: dynamic(() => import("./sections/story"), {
      loading: () => <FallbackSection id="story" />,
      ssr: true,
    }),
    enabled: true,
    lazy: true,
  },
  gift: {
    id: "gift",
    displayName: "Gift",
    component: dynamic(() => import("./sections/gift"), {
      loading: () => <FallbackSection id="gift" />,
      ssr: true,
    }),
    enabled: true,
    lazy: true,
  },
  rsvp: {
    id: "rsvp",
    displayName: "RSVP",
    component: dynamic(() => import("./sections/rsvp"), {
      loading: () => <FallbackSection id="rsvp" />,
      ssr: true,
    }),
    enabled: true,
    lazy: true,
  },
  wish: {
    id: "wish",
    displayName: "Wishes",
    component: dynamic(() => import("./sections/wish"), {
      loading: () => <FallbackSection id="wish" />,
      ssr: true,
    }),
    enabled: true,
    lazy: true,
  },
  footer: {
    id: "footer",
    displayName: "Footer",
    component: dynamic(() => import("./sections/footer"), {
      loading: () => <FallbackSection id="footer" />,
      ssr: true,
    }),
    enabled: true,
    lazy: true,
  },
};
