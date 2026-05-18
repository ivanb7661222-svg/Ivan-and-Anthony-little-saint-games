import GameCard from './GameCard';

export default function GameGrid({ games, onSelectGame }) {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-4xl mb-4">👾</div>
        <h3 className="text-xl font-mono text-brand-muted">No games found matching your search.</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} onClick={onSelectGame} />
      ))}
    </div>
  );
}
