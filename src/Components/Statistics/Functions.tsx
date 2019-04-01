import { PoolStatistic } from "../../Models/PoolStatistic";

/**
 * Returns the total of frequency
 * @param set
 */
export const GetFrequencyTotal = (set: PoolStatistic[]) =>
	set.reduce((total, obj) => {
		return total + obj.frequency;
	}, 0);

/**
 * Gets the average (modified by the statistic frequency)
 * @param set
 * @param frequency
 */
export const GetAverage = (set: PoolStatistic[], frequency: number): number => {
	return (
		set.reduce((total, obj) => {
			return total + obj.quantity * obj.frequency;
		}, 0) / frequency
	);
};

/**
 * Returns the Standard Deviation for a given dataset
 * @param set
 * @param frequency
 * @param mean
 */
export const GetStandardDeviation = (set: PoolStatistic[], frequency: number, mean: number): number => {
	//(val - mean) squared * qty
	const deviationSet = set.map(map => (map.quantity - mean) ** 2 * map.frequency);

	//sqrt(sum(deviations) / frequency)
	return Math.sqrt(
		deviationSet.reduce((total, obj) => {
			return total + obj;
		}, 0) / frequency
	);
};
