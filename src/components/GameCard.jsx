// Create a game card
export default function GameCard({ game, id, handleClick }) {
	return (
		<div 
			className="game-card"
			style={{ backgroundImage: `url(${game.background_image})` }}
			data-id={id}
			onClick={(e) => handleClick(e.currentTarget.dataset.id)}
		>
			<div className="game-info">
				<h2>{game.name}</h2>
				<p>Metacritic: {game.metacritic}</p>
			</div>
		</div>
	)
};