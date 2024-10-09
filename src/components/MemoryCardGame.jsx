import { useState } from "react";
import GameCard from "./GameCard";
import Header from "./Header";
import useFetchData from "./useFetchData";
import { shuffleArray } from "./utils";

const API_KEY = 'd8ee147c3c98420d8d2c5b7ef65b5cd6';
const RAWG_2004_URL = 'https://api.rawg.io/api/games?dates=2004-01-01,2004-12-31&page_size=40&key=';
const RAWG_2004_URL_2 = 'https://api.rawg.io/api/games?dates=2004-01-01,2004-12-31&page_size=40&page=2&key=';
const RAWG_2004_URL_3 = 'https://api.rawg.io/api/games?dates=2004-01-01,2004-12-31&page=5&key=';

export default function MemoryCardGame() {
	// Fetch game API data
	const { data: page1, error: error1 } = useFetchData(`${RAWG_2004_URL}${API_KEY}`);
	const { data: page2, error: error2 } = useFetchData(`${RAWG_2004_URL_2}${API_KEY}`);
	const { data: page3, error: error3 } = useFetchData(`${RAWG_2004_URL_3}${API_KEY}`);
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	// Track already clicked cards
	const [clicked, setClicked] = useState([]);
	
	function checkClicked(id) {
		return clicked.includes(id);
	}
	// Check if the click was on a new card or on an already clicked one
	function handleScore(id) {
		if (checkClicked(id)) {
			// Update best score if needed
			if (score > bestScore) {
				setBestScore(score)
			}
			setScore(0)
			setClicked([])
		} else {
			setScore(score + 1)
			setClicked([...clicked, id])
		}
	}
	// Handle fetch API error
	if (error1 || error2 || error3) {
		return (
			<ul className="error-msg">
				<li>Error:
				<ul>
					{error1 && <li>{error1.message}</li>}
					{error2 && <li>{error2.message}</li>}
					{error3 && <li>{error3.message}</li>}
				</ul>
				</li>
			</ul>
		) 
	};
	// Display loader when waiting for API to fetch
	if (!page1 || !page2 || !page3) {
		return <div className="loader"></div>
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
	
	return (
		<>
			<Header
				score={score}
				bestScore={bestScore}
			/>
			<main className="cards-cont">
				{games.map((game) => {
					return (
						<GameCard 
							key={game.id}
							id={game.id}
							game={game}
							handleClick={handleScore}
						/>
					)
				})}
			</main>
		</>
	)
};

