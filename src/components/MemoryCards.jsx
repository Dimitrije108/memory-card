import { useEffect, useState } from "react"

const API_KEY = 'd8ee147c3c98420d8d2c5b7ef65b5cd6';
const RAWG_2004_URL = 'https://api.rawg.io/api/games?dates=2004-01-01,2004-12-31&page_size=40&key=';
const RAWG_2004_URL_2 = 'https://api.rawg.io/api/games?dates=2004-01-01,2004-12-31&page=3&key=';

export default function MemoryCards() {
	const { data: page1, error: error1 } = useFetchData(`${RAWG_2004_URL}${API_KEY}`);
	const { data: page2, error: error2 } = useFetchData(`${RAWG_2004_URL_2}${API_KEY}`);

	if (!page1 || !page2) {
		return <div>Loading...</div>
	}

	if (error1 || error2) {
		return (
			<div>Error: {error1}, {error2}</div>
		)
	}
	
	return (
		<div className="cards-cont">
			<GameCard 
				game={page1[0]}
			/>
			<GameCard 
				game={page1[1]}
			/>
			<GameCard 
				game={page1[9]}
			/>
			<GameCard 
				game={page1[10]}
			/>
			<GameCard 
				game={page1[12]}
			/>
			<GameCard 
				game={page1[18]}
			/>
			<GameCard 
				game={page1[19]}
			/>
			<GameCard 
				game={page1[4]}
			/>
		</div>
	)
}

function GameCard({ game }) {
	return (
		<div 
			className="game-card"
			style={{ backgroundImage: `url(${game.background_image})` }}
		>
			<h2>{game.name}</h2>
			<p>Metacritic: {game.metacritic}</p>
		</div>
	)
}

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
}