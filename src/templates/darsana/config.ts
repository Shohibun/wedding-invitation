import { TemplateConfig } from "../core/types";

export const darsanaDefaultData = {
  cover: {
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2070&auto=format&fit=crop",
    title: "The Wedding Of",
    greeting: "Kepada Yth. Bapak/Ibu/Saudara/i:",
    buttonText: "Buka Undangan",
    musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  couple: {
    groom: {
      fullName: "Shohibun Najam I.",
      nickname: "Shohibun",
      parents: "Putra dari Bpk. Moh. Firdaus & Ibu Zeiniyah",
      instagram: "@shohibun.najam",
      photoUrl: "",
    },
    bride: {
      fullName: "Jiwoon",
      nickname: "Jiwoon",
      parents: "Putri tercinta dari Bpk. Smith & Ibu Jane",
      instagram: "@jiwoon",
      photoUrl: "",
    },
  },
  events: [
    {
      title: "Akad Nikah",
      date: "2026-08-30",
      time: "09:00",
      startTime: "09:00",
      endTime: "11:00",
      locationName: "Rumah Mempelai Pria",
      venue: "Rumah Mempelai Pria",
      address: "Dusun Ledok Rt 003 / Rw 001",
      mapsUrl: "",
      googleMapsUrl: "",
    },
  ],
  gallery: [],
  gift: [
    {
      bank: "BCA",
      accountNumber: "3340768867",
      accountName: "SHOHIBUN NAJAM ILMA",
      qrCodeUrl: "",
    },
  ],
  gifts: [
    {
      bank: "BCA",
      accountNumber: "3340768867",
      accountName: "SHOHIBUN NAJAM ILMA",
      qrCodeUrl: "",
    },
  ],
  story: [
    {
      id: "story-1",
      date: "2024-01-15",
      title: "Pertama Bertemu",
      description: "Pertemuan pertama yang penuh kesan manis dan tak terlupakan.",
    },
  ],
  quote: {
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.",
    author: "QS. Ar-Rum: 21",
  },
  rsvp: {
    enabled: true,
    deadline: "",
  },
  wish: {
    enabled: true,
  },
  music: {
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
};

export const darsanaConfig: TemplateConfig = {
  version: 1,
  preset: "classic",
  theme: "light",
  typography: {
    headingFont: "Playfair Display",
    bodyFont: "Inter",
  },
  colors: {
    primary: "#D4AF37",
    secondary: "#1A1A1A",
  },
  layout: {
    containerWidth: "lg",
    spacing: "relaxed",
    borderRadius: "lg",
  },
  animations: {
    enabled: true,
    speed: "normal",
  },
  sections: {
    enabled: [
      "cover",
      "hero",
      "quote",
      "couple",
      "countdown",
      "event",
      "story",
      "gallery",
      "gift",
      "rsvp",
      "wish",
      "footer",
    ],
    order: [
      "cover",
      "hero",
      "quote",
      "couple",
      "countdown",
      "event",
      "story",
      "gallery",
      "gift",
      "rsvp",
      "wish",
      "footer",
    ],
    hidden: [],
    locked: ["cover", "footer"],
    variants: {},
  },
  ...darsanaDefaultData,
};
