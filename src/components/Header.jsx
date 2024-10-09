// Create header content including score
export default function Header({ score, bestScore }) {
	return (
		<header>
			<div className="heading-cont">
				<h1>Memory card game</h1>
				<p>Increase your score by clicking on a game card but <span className="accent">don't click on any twice</span>!</p>
				<p>Brush up on video games that came out in <span className="accent">2004</span>, the best year in gaming!</p>
			</div>
			<div className="score-cont">
				<div className="score">
					<p>Score: </p>
					<span>{score}</span>
				</div>
				<div className="best-score">
					<p>Best score: </p>
					<span>{bestScore}</span>
				</div>
			</div>
		</header>
	)
}

