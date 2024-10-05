import { useEffect, useState } from "react"

const API_KEY = 'd8ee147c3c98420d8d2c5b7ef65b5cd6';
const RAWG_2004_URL = 'https://api.rawg.io/api/games?dates=2004-01-01,2004-12-31&page_size=40&key=';
const RAWG_2004_URL_2 = 'https://api.rawg.io/api/games?dates=2004-01-01,2004-12-31&page=3&key=';

export default function GameCovers() {
	const page1 = useFetchData(`${RAWG_2004_URL}${API_KEY}`);
	const page2 = useFetchData(`${RAWG_2004_URL_2}${API_KEY}`);

	console.log(page1)
	console.log(page2)

	// return (

	// )
}

function GameCard({ game }) {
	// return (
	// 	<div className="game-card">
	// 		<img></img>
	// 	</div>
	// )
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