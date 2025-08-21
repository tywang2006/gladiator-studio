import { GameData } from '../types';

export const fetchGameData = async (): Promise<GameData> => {
  try {
    const response = await fetch('https://game-lobby-kappa.vercel.app/api/data');
    if (!response.ok) {
      throw new Error('Failed to fetch game data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching game data:', error);
    // Return mock data if the fetch fails
    return {
      slotGames: [
        {
          id: 4,
          title: "To The Top",
          description: "To the Top™ is a 5-reel slot game...",
          image: "assets/to-the-top.png",
          link: "https://to-the-top-71bb9.web.app/",
          timeline: "2024-10-30"
        },
        {
          id: 2,
          title: "Sweety Treaty",
          description: "Sweety Treaty™ is a 5-reel slot game...",
          image: "assets/sweety-treaty.png",
          link: "https://sweety-treaty.web.app/",
          timeline: "2025-04-30"
        }
      ],
      miniGames: [
        {
          id: 5,
          title: "Plinko",
          description: "Drop the ball and win big!",
          image: "assets/plinko.png",
          link: "https://cdn-dev.mwgames.io/metawin/plinko",
          timeline: "2024-12-01"
        },
        {
          id: 6,
          title: "Mines",
          description: "Avoid the mines to win!",
          image: "assets/mines.jpg",
          link: "https://cdn-dev.mwgames.io/metawin/mines",
          timeline: "2024-11-15"
        }
      ]
    };
  }
};