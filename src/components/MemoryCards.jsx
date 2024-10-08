import { useEffect, useState } from "react"

const API_KEY = 'd8ee147c3c98420d8d2c5b7ef65b5cd6';
const RAWG_2004_URL = 'https://api.rawg.io/api/games?dates=2004-01-01,2004-12-31&page_size=40&key=';
const RAWG_2004_URL_2 = 'https://api.rawg.io/api/games?dates=2004-01-01,2004-12-31&page_size=40&page=2&key=';
const RAWG_2004_URL_3 = 'https://api.rawg.io/api/games?dates=2004-01-01,2004-12-31&page=5&key=';

export default function MemoryCards() {
	const { data: page1, error: error1 } = useFetchData(`${RAWG_2004_URL}${API_KEY}`);
	const { data: page2, error: error2 } = useFetchData(`${RAWG_2004_URL_2}${API_KEY}`);
	const { data: page3, error: error3 } = useFetchData(`${RAWG_2004_URL_3}${API_KEY}`);
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	// Track already clicked on cards
	const [clicked, setClicked] = useState([]);
	// Update best score if needed
	function handleBestScore() {
		if (score > bestScore) {
			setBestScore(score)
		}
	}
	
	function checkClicked(id) {
		return clicked.includes(id);
	}
	// Check if the click was on a new card or on an already clicked one
	function handleScore(id) {
		if (checkClicked(id)) {
			handleBestScore()
			setScore(0)
			setClicked([])
		} else {
			setScore(score + 1)
			setClicked([...clicked, id])
		}
	}

	if (!page1 || !page2 || !page3) {
		return <div className="loader"></div>
	};

	if (error1 || error2 || error3) {
		return (
			<div>Error: {error1}, {error2}</div>
		)
	};
	// Array of games picked from the API to be displayed
	const games = [
		page1[0], page1[1], page1[4], 
		page1[9], page1[10], page1[12], 
		page1[13], page1[19], page1[24], 
		page1[29], page1[33], page1[34], 
		page1[37], page2[3], page2[16], 
		page3[7]
	];
	// Shuffle cards on every rerender
	shuffleArray(games);
	// Map through the array and display game cards
	return (
		<>
			<header>
				<div className="heading-cont">
					<h1>Memory card game</h1>
					<p>Increase your score by clicking on a game card but don't click on any twice!</p>
					<p>Brush up on video games that came out in 2004, the best year in gaming!</p>
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
			<main className="cards-cont">
				{games.map((game) => {
					return <GameCard 
					key={game.id}
					id={game.id}
					game={game}
					handleClick={handleScore}
				/>
				})}
			</main>
		</>
	)
};
// TODO: Refactor into a separate module
function GameCard({ game, id, handleClick }) {
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
// Takes in an array and shuffles items inside (Fisher-Yates Shuffle)
function shuffleArray(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
};
// Custom hook to fetch API data
function useFetchData(url) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		let ignore = false;

		const fetchData = async () => {
			try {
				const response = await fetch(url);
				// Check if response is ok
				if (!response.ok) {
					throw new Error(`Status: ${response.status} ${response.statusText}`);
				}
				const jsonData = await response.json();
				// Check if data has an error
				if (jsonData.error) {
					throw new Error(`Status: ${jsonData.error.code} ${jsonData.error.message}`);
				}
				if (!ignore) {
					setData(jsonData.results)
				}
			} catch (error) {
				if (!ignore) {
					setError(error);
				}
				console.error(error);
				alert(error);
			}
		}

		fetchData();

		return () => {
			ignore = true;
		};
	}, [url])

	return { data, error };
};