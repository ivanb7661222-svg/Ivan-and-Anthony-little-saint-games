import { Search, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header({ onHome, searchTerm, setSearchTerm }) {
  return (
    <header className="h-[70px] border-b border-brand-border flex items-center justify-between px-8 bg-brand-bg-panel sticky top-0 z-50 backdrop-blur-md">
      <motion.button
        onClick={onHome}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 bg-brand-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]">
          <span className="font-black text-black text-lg">LS</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.2em] -mb-1">
            Ivan & Anthony
          </span>
          <h1 className="text-xl font-black tracking-wider neon-text uppercase italic">
            Little Saint Games
          </h1>
        </div>
      </motion.button>

      <div className="flex gap-6 items-center flex-1 justify-end max-w-2xl px-8">
        <div className="relative w-full group max-w-md hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted group-focus-within:text-brand-accent transition-colors" />
          <input
            type="text"
            placeholder="Search restricted sector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-full py-2 px-12 w-full text-sm focus:outline-none focus:border-brand-accent transition-all focus:bg-white/10"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="md:hidden text-brand-text-muted hover:text-brand-accent p-2">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
