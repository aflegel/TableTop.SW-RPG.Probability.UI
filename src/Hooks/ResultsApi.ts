import axios from "axios";
import { useState } from "react";
import { PoolDice } from "../Models";
import { RollContainer } from "../Models/Roll";

const InitialState: RollContainer = {
	positiveResults: [],
	negativeResults: [],
};

interface StatisticsHook {
	statistics: RollContainer;
	clearResults: () => void;
	getResultsAsync: (dice: PoolDice[]) => Promise<void>;
}

/**
 * Wraps API interactions to search for dice results
 */
export const useResults = (): StatisticsHook => {
	const [statistics, setStatistics] = useState(InitialState);

	const jsonHeader = { headers: { "Content-Type": "application/json; charset=utf-8" } };

	/**
	 * Gets dice roll results from the API.
	 */
	const getResultsAsync = async (dice: PoolDice[]): Promise<void> => {
		try {
			const result = await axios.post<RollContainer>(`http://localhost:62546/Roll`, dice, jsonHeader);
			setStatistics({ ...result.data });
		} catch {
			setStatistics(InitialState);
		}
	};

	const clearResults = () => {
		setStatistics(InitialState);
	};

	return { statistics, clearResults, getResultsAsync };
};
