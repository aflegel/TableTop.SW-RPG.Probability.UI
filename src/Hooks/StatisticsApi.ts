import axios from "axios";
import { useState } from "react";
import { PoolDice } from "../Models";
import { PoolCombination } from "../Models/Statistics";

const InitialState: PoolCombination = {
	statistics: [],
	dice: [],
};

interface StatisticsHook {
	statistics: PoolCombination;
	getStatisticsAsync: (dice: PoolDice[]) => Promise<void>;
}

/**
 * Wraps API interactions to search for dice results
 */
export const useStatistics = (): StatisticsHook => {
	const [statistics, setStatistics] = useState(InitialState);

	const jsonHeader = { headers: { "Content-Type": "application/json; charset=utf-8" } };

	/**
	 * Gets dice statistics from the API.
	 */
	const getStatisticsAsync = async (dice: PoolDice[]): Promise<void> => {
		try {
			const result = await axios.post<PoolCombination>(`http://localhost:62546/Search`, dice, jsonHeader);
			setStatistics({ ...result.data });
		} catch {
			setStatistics(InitialState);
		}
	};

	return { statistics, getStatisticsAsync };
};
