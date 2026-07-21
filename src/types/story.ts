export interface StoryItem {
  id: string;
  date: string; // Can be just year "2020", or full date "14 Februari 2020"
  title: string; // e.g., "Awal Bertemu"
  description: string;
  imageUrl?: string;
  order: number;
}
