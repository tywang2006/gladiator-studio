import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GameShowcase from './components/GameShowcase';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import JourneySection from './components/JourneySection';
import PartnersSection from './components/PartnersSection';
import CareersSection from './components/CareersSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { fetchGameData } from './api/gameData';
import { GameData } from './types';
import './index.css';

function App() {
  const [gameData, setGameData] = useState<GameData>({ slotGames: [], miniGames: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGameData();
        setGameData(data);
      } catch (error) {
        console.error('Failed to load game data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Global animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,0,255,0.15)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,200,255,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,0,150,0.1)_0%,transparent_50%)]"></div>
      </div>
      
      <Navbar />
      <Hero />

      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-300">Loading game portfolio...</p>
        </div>
      ) : (
        <GameShowcase slotGames={gameData.slotGames} miniGames={gameData.miniGames} />
      )}

      <AboutSection />
      <TeamSection />
      <JourneySection />
      <PartnersSection />
      <CareersSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;