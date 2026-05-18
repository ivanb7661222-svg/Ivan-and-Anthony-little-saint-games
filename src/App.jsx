import { useState, useMemo } from 'react';
import Header from './components/Header';
import GameGrid from './components/GameGrid';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import gamesData from './data/games.json';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Sword, Zap, Trophy } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'All', icon: LayoutGrid },
    { name: 'Action', icon: Sword },
    { name: 'Sports', icon: Trophy },
    { name: 'Arcade', icon: Zap },
  ];

  const sportsGames = useMemo(() => {
    return gamesData.filter(game => game.category.toLowerCase() === 'sports');
  }, [gamesData]);

  const featuredGames = useMemo(() => {
    const featuredIds = ['1v1-lol', 'slope', 'basket-random', 'basket-hoop'];
    return gamesData.filter(game => featuredIds.includes(game.id));
  }, [gamesData]);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category.toLowerCase() === activeCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, gamesData]);

  const handleSelectGame = (game) => {
    setSelectedGame(game);
    setCurrentView('game');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-brand-bg-deep text-brand-text flex flex-col">
      <Header 
        onHome={handleBackToHome} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      <div className="flex flex-1 overflow-hidden">
        {currentView === 'home' && (
          <aside className="w-64 border-r border-brand-border bg-brand-bg-panel hidden lg:flex flex-col py-6">
            <div className="px-6 mb-8 text-[10px] uppercase tracking-[0.2em] font-black text-white/30">
              Browse Categories
            </div>
            
            <nav className="flex flex-col gap-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.name}
                    className={`sidebar-item flex items-center gap-3 ${activeCategory === cat.name ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.name}
                  </div>
                );
              })}
            </nav>

            <div className="mt-auto px-6 py-6 border-t border-brand-border">
            </div>
          </aside>
        )}

        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {currentView === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 md:p-8 flex flex-col gap-8"
              >
                {activeCategory === 'All' && !searchTerm && (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-brand-accent" />
                      <h3 className="text-2xl font-black uppercase tracking-tighter italic">
                        Featured <span className="text-brand-accent text-sm ml-2">Collection</span>
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {featuredGames.map((game) => (
                        <GameCard key={game.id} game={game} onClick={handleSelectGame} />
                      ))}
                    </div>
                    <div className="h-px bg-brand-border w-full my-4 opacity-50" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black uppercase tracking-tighter italic">
                    {activeCategory === 'All' ? 'Available' : activeCategory} <span className="text-brand-accent">Games</span>
                  </h3>
                </div>

                <GameGrid games={filteredGames} onSelectGame={handleSelectGame} />
              </motion.div>
            )}

            {currentView === 'game' && selectedGame && (
              <motion.div
                key="game"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8"
              >
                <GamePlayer game={selectedGame} onBack={handleBackToHome} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <footer className="h-14 border-t border-brand-border bg-brand-bg-panel flex items-center justify-between px-8 text-[11px] text-white/30 uppercase tracking-widest font-bold">
        <div className="flex items-center gap-6">
          <div>Total Games: {gamesData.length}</div>
        </div>
        
        <div className="flex gap-8">
          <div className="text-brand-accent/60">Built by Ivan & Anthony</div>
        </div>
      </footer>
    </div>
  );
}
