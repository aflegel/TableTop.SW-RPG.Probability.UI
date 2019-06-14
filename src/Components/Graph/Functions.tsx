import { PoolStatistic, PoolDice, DieSymbol, DieType } from "../../Models";

/**
 * Returns the total of frequency
 * @param set
 */
export const GetFrequencyTotal = (set: PoolStatistic[]): number =>
	set.reduce((total, obj) => {
		return total + obj.frequency;
	}, 0);

/**
 * Returns the total of quantity
 * @param set
 */
export const GetQuantityTotal = (set: PoolDice[]): number =>
	set.reduce((total, obj) => {
		return total + obj.quantity;
	}, 0);

/**
 * Gets the average (modified by the statistic frequency)
 * @param set
 * @param frequency
 */
export const GetAverage = (set: PoolStatistic[], frequency: number): number =>
	set.reduce((total, obj) => {
		return total + obj.quantity * obj.frequency;
	}, 0) / frequency;

/**
 * Calculates the probability returned as a number between 0 and 100
 * @param numerator
 * @param denominator
 */
export const GetProbability = (numerator: number, denominator: number): number => (numerator / denominator) * 100;

/**
 * Returns the Standard Deviation for a given dataset
 * @param set
 * @param frequency
 * @param mean
 */
export const GetStandardDeviation = (set: PoolStatistic[], frequency: number, mean: number): number => {
	// (val - mean) squared * qty
	const deviationSet = set.map(map => (map.quantity - mean) ** 2 * map.frequency);

	// sqrt(sum(deviations) / frequency)
	return Math.sqrt(
		deviationSet.reduce((total, obj) => {
			return total + obj;
		}, 0) / frequency
	);
};

/**
 * Returns a shortened list of
 * @param dice
 * @param dicer
 */
export const FilterPool = (pool: PoolDice[], dice: DieType[]): PoolDice[] => pool.filter(f => !!dice.find(die => die === f.dieId));

/**
 * Formats the number as a comma separated thousands and limited to 4 digits if required
 * @param predicate
 * @param digits
 */
export const Format = (predicate: number, digits: boolean): string => new Intl.NumberFormat("en-Us", { minimumFractionDigits: digits ? 4 : 0 }).format(predicate);

export const AverageLabel = (mode: DieSymbol): string => `Average ${DieSymbol[mode]}`;

export const NetLabel = (mode: DieSymbol): string => `Net ${DieSymbol[mode]}`;

export const IsBlank = (mode: DieSymbol): boolean => mode === DieSymbol.Blank;

export const ValueFormatter = (value: any, name: any, props: any): string[] => [Format(value, true), name];
