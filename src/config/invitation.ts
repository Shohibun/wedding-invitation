export const invitationConfig = {
  // Daftar urutan seksi default pada sebuah undangan
  defaultSections: [
    "cover",
    "hero",
    "story",
    "event",
    "gallery",
    "countdown",
    "rsvp",
    "gift",
    "wish",
  ],

  // Pengaturan default undangan
  defaults: {
    locale: "id-ID",
    timezone: "Asia/Jakarta",
    musicAutoPlay: true,
  },

  // Data dummy sementara sebelum terhubung ke database
  dummyData: {
    groom: {
      name: "Romeo",
      fullName: "Romeo Montague",
      fatherName: "Bpk. Lord Montague",
      motherName: "Ibu Lady Montague",
    },
    bride: {
      name: "Juliet",
      fullName: "Juliet Capulet",
      fatherName: "Bpk. Lord Capulet",
      motherName: "Ibu Lady Capulet",
    },
    date: "2026-12-31T09:00:00.000Z",
  },
};
