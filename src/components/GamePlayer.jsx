import { ArrowLeft, Maximize2, RotateCcw, Share2, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function GamePlayer({ game, onBack }) {
  const [key, setKey] = useState(0);

  const reload = () => setKey(k => k + 1);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ x: -4 }}
            onClick={onBack}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-text-muted hover:border-brand-accent hover:text-brand-accent transition-all bg-white/5 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest px-2 py-0.5 rounded bg-brand-accent/5 border border-brand-accent/10">
                {game.category}
              </span>
            </div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter neon-text">
              {game.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/5 bg-white/5 text-brand-text-muted hover:border-brand-accent hover:text-brand-accent transition-all text-xs font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4" />
            Favorite
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/5 bg-white/5 text-brand-text-muted hover:border-brand-accent hover:text-brand-accent transition-all text-xs font-bold uppercase tracking-wider">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent/20 to-transparent blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="relative aspect-video w-full rounded-2xl border border-white/10 bg-black overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.05)]">
          <iframe
            key={key}
            id="game-frame"
            src={game.iframeUrl}
            className="w-full h-full"
            allow="fullscreen; autoplay; encrypted-media; pointer-lock; microphone"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
            title={game.title}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xs font-black uppercase text-brand-accent tracking-[0.3em] mb-4 italic">Description</h3>
            <p className="text-brand-text-muted leading-relaxed text-sm">
              {game.description}
            </p>
          </div>
        </div>

        <aside className="lg:w-72 flex flex-col gap-4">
          <div className="p-6 rounded-2xl bg-brand-accent/5 border border-brand-accent/10 flex flex-col gap-4">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-accent">Actions</h4>
             <button 
                onClick={reload}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent hover:text-brand-accent flex items-center justify-center gap-3 transition-all font-bold text-xs uppercase tracking-widest"
             >
                <RotateCcw className="w-4 h-4" />
                Reload Game
             </button>
             <button 
                onClick={() => document.getElementById('game-frame')?.requestFullscreen()}
                className="w-full py-3 rounded-xl bg-brand-accent text-black hover:bg-white transition-all flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest"
             >
                <Maximize2 className="w-4 h-4 text-black" />
                Fullscreen
             </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
