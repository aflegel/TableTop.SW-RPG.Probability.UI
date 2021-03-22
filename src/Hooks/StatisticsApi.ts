import axios from "axios";
import { useState } from "react";
import { PoolDice } from "../Models";
import { RollContainer } from "../Models/Roll";
import { PoolCombination } from "../Models/Statistics";

export type StatisticsState = StatisticsResults & StatisticsDice;

export interface StatisticsResults {
	poolCombination: PoolCombination;
	poolRoll: RollContainer;
}

export interface StatisticsDice {
	searchDice: PoolDice[];
}

export const InitialState: StatisticsState = {
	poolRoll: {
		positiveResults: [],
		negativeResults: [],
	},
	poolCombination: {
		statistics: [],
		dice: [],
	},
	searchDice: [
		{ dieType: "Ability", quantity: 1 },
		{ dieType: "Difficulty", quantity: 1 },
	],
};

interface StatisticsHook {
	statistics: StatisticsState;
	getStatisticsAsync: (dice: PoolDice[]) => Promise<void>;
	getResultsAsync: (dice: PoolDice[]) => Promise<void>;
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
			const result = await axios.post(`http://localhost:62546/Search`, dice, jsonHeader);
			setStatistics({ ...statistics, poolCombination: result.data });
		} catch {
			setStatistics(InitialState);
		}
	};

	/**
	 * Gets dice roll results from the API.
	 */
	const getResultsAsync = async (dice: PoolDice[]): Promise<void> => {
		try {
			const result = await axios.post(`http://localhost:62546/Roll`, dice, jsonHeader);
			setStatistics({ ...statistics, poolRoll: result.data });
		} catch {
			setStatistics(InitialState);
		}
	};

	return { statistics, getStatisticsAsync, getResultsAsync };
};