import { motion } from 'motion/react';
import React from 'react';

const GameCard = ({ game, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="immersive-card group cursor-pointer flex flex-col h-full bg-[#0f111a]"
      onClick={() => onClick(game)}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1a1c2e] flex items-center justify-center">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] to-transparent opacity-60" />
        <div className="absolute top-3 left-3">
          <span className="text-[10px] px-2 py-0.5 rounded bg-brand-accent/10 text-brand-accent border border-brand-accent/20 font-bold tracking-widest uppercase">
            {game.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-bold text-sm tracking-wide group-hover:text-brand-accent transition-colors">
          {game.title}
        </h3>
        <p className="text-[11px] text-brand-text-muted line-clamp-2 leading-relaxed">
          {game.description}
        </p>
      </div>
    </motion.div>
  );
};

export default GameCard;
