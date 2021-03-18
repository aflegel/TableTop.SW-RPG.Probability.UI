/**
 * Returns the total of frequency
 * @param set
 */
export const GetFrequencyTotal = (set: import("../../Models/Statistics").PoolStatistic[]): number => set.reduce((total, obj) => total + obj.frequency, 0);

/**
 * Returns the total of quantity
 * @param set
 */
export const GetQuantityTotal = (set: import("../../Models").PoolDice[]): number => set.reduce((total, obj) => total + obj.quantity, 0);

/**
 * Gets the average (modified by the statistic frequency)
 * @param set
 * @param frequency
 */
export const GetAverage = (set: import("../../Models/Statistics").PoolStatistic[], frequency: number): number => set.reduce((total, obj) => total + obj.quantity * obj.frequency, 0) / frequency;

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
export const GetStandardDeviation = (set: import("../../Models/Statistics").PoolStatistic[], frequency: number, mean: number): number =>
	// sqrt(sum(deviations) / frequency)
	Math.sqrt(
		// (val - mean) squared * qty
		set.map((map) => (map.quantity - mean) ** 2 * map.frequency).reduce((total, obj) => total + obj, 0) / frequency
	);

/**
 * Returns a shortened list of
 * @param dice
 * @param dicer
 */
export const FilterPool = (pool: import("../../Models").PoolDice[], dice: import("../../Models").DieType[]): import("../../Models").PoolDice[] =>
	pool.filter((f) => !!dice.find((die) => die === f.dieType));

/**
 * Formats the number as a comma separated thousands and limited to 4 digits if required
 * @param predicate
 * @param digits
 */
// eslint-disable-next-line no-undef
export const Format = (predicate: number, digits: boolean): string => new Intl.NumberFormat("en-Us", { minimumFractionDigits: digits ? 4 : 0 }).format(predicate);

export const IsBlank = (mode: import("../../Models").DieSymbol): boolean => mode === "Blank";

/**
 * A formatter for the popover label in the Graph
 * @param value
 * @param name
 * @param props
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const ValueFormatter = (value: any, name: any, props: any): string[] => [Format(value, true), name];
