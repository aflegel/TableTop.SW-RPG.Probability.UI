import React, { FunctionComponent } from "react";
import { DieSymbol } from "../../Models/DieSymbol";
import { PoolStatistic } from "../../Models/PoolStatistic";

export interface IGraphBreakdownProps {
	mode: DieSymbol;
	counterMode: DieSymbol;
	filteredSet: PoolStatistic[];
	totalFrequency: number;
}

/**
 * Calculates the statictical model and builds a definition list for that data
 */
export const GraphBreakdown: FunctionComponent<IGraphBreakdownProps> = (props: IGraphBreakdownProps) => {
	const Format = (predicate: number, digits: boolean): string => {
		return new Intl.NumberFormat("en-Us", { minimumFractionDigits: digits ? 4 : 0 }).format(predicate);
	};

	const GetTotal = (set: PoolStatistic[]): number => {
		return set.reduce((total, obj) => {
			return total + obj.frequency;
		}, 0);
	};

	const GetAverage = (): number => {
		return (
			props.filteredSet.reduce((total, obj) => {
				return total + obj.quantity * obj.frequency;
			}, 0) / props.totalFrequency
		);
	};

	const GetStandardDeviation = (average: number): number => {
		const deviationSet = props.filteredSet.map(map => (map.quantity - average) ** 2 * map.frequency);

		return Math.sqrt(
			deviationSet.reduce((total, obj) => {
				return total + obj;
			}, 0) / props.totalFrequency
		);
	};

	const positiveFrequency = GetTotal(props.filteredSet.filter(f => f.quantity > 0));
	//success mode requires 0 quantity outcomes as well
	const negativeFrequency = GetTotal(props.filteredSet.filter(f => f.quantity < (props.mode == DieSymbol.Success ? 1 : 0)));

	const average = GetAverage();

	//val - avg squared * qty
	const standardDeviation = GetStandardDeviation(average);

	return (
		<dl>
			<dt>{props.mode == DieSymbol.Success ? "Total Frequency" : ""}</dt>
			<dd>{props.mode == DieSymbol.Success ? Format(props.totalFrequency, false) : null}</dd>
			<dt>{DieSymbol[props.mode]} Frequency</dt>
			<dd>{Format(positiveFrequency, false)}</dd>
			<dt>Probability of {DieSymbol[props.mode]}</dt>
			<dd>{Format((positiveFrequency / props.totalFrequency) * 100, true)}%</dd>
			<dt>{DieSymbol[props.counterMode]} Frequency</dt>
			<dd>{Format(negativeFrequency, false)}</dd>
			<dt>Probability of {DieSymbol[props.counterMode]}</dt>
			<dd>{Format((negativeFrequency / props.totalFrequency) * 100, true)}%</dd>
			<dt>Average {DieSymbol[props.mode]}</dt>
			<dd>{Format(average, true)}</dd>
			<dt>Standard Deviation</dt>
			<dd>{Format(standardDeviation, true)}</dd>
		</dl>
	);
};
