import { useState, useEffect } from "react";
// Custom hook to fetch API data
export default function useFetchData(url) {
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
			}
		}

		fetchData();

		return () => {
			ignore = true;
		};
	}, [url])

	return { data, error };
};