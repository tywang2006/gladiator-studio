export interface SlotGame {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  timeline: string;
}

export interface MiniGame {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  timeline: string;
}

export interface GameData {
  slotGames: SlotGame[];
  miniGames: MiniGame[];
}