export type GameCategory = 'slot' | 'mini';

export interface Game {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly link: string;
  readonly timeline: string;
  readonly category: GameCategory;
  readonly slug: string;
  readonly rtp: number;
  readonly volatility: 'HIGH' | 'ULTRA';
  readonly genre: string;
  readonly isHot?: boolean;
}

export interface GameData {
  readonly slotGames: readonly Game[];
  readonly miniGames: readonly Game[];
}
