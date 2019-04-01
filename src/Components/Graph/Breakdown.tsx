import React, { FunctionComponent } from "react";
import { DieSymbol } from "../../Models/DieSymbol";
import { PoolStatistic } from "../../Models/PoolStatistic";
import { GetFrequencyTotal, GetAverage, GetStandardDeviation } from "../Statistics/Functions";
import { Format } from "./Formatter";
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
	const positiveFrequency = GetFrequencyTotal(props.filteredSet.filter(f => f.quantity > 0));
	//success mode requires 0 quantity outcomes as well
	const negativeFrequency = GetFrequencyTotal(props.filteredSet.filter(f => f.quantity < (props.mode == DieSymbol.Success ? 1 : 0)));

	const average = GetAverage(props.filteredSet, props.totalFrequency);
	const standardDeviation = GetStandardDeviation(props.filteredSet, props.totalFrequency, average);

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
