import React, { FunctionComponent } from "react";
import { DieSymbol } from "../../Models/DieSymbol";
import { PoolStatistic } from "../../Models/PoolStatistic";

export interface IGraphBreakdownProps {
	mode: DieSymbol;
	counterMode: DieSymbol;
	baseSet: PoolStatistic[];
	totalFrequency: number;
}

export const GraphBreakdown: FunctionComponent<IGraphBreakdownProps> = (props: IGraphBreakdownProps) => {
	/**
	 * Calculates the statictical model and builds a definition list for that data
	 */
	const positiveSet = props.baseSet.filter(f => f.quantity > 0);
	//success mode requires 0 quantity outcomes as well
	const negativeSet = props.baseSet.filter(f => f.quantity < (props.mode == DieSymbol.Success ? 1 : 0));

	const positiveFrequency = positiveSet.reduce((total, obj) => { return total + obj.frequency; }, 0);
	const negativeFrequency = negativeSet.reduce((total, obj) => { return total + obj.frequency; }, 0);

	const average = props.baseSet.reduce((total, obj) => { return total + obj.quantity * obj.frequency; }, 0) / props.totalFrequency;
	//val - avg squared * qty
	const deviationSet = props.baseSet.map(map => (map.quantity - average) ** 2 * map.frequency);
	const standardDeviation = Math.sqrt(deviationSet.reduce((total, obj) => { return total + obj; }, 0) / props.totalFrequency);

	const totalLabeling = props.mode == DieSymbol.Success ? "Total Frequency" : "";
	const totalData = props.mode == DieSymbol.Success ? new Intl.NumberFormat("en-Us").format(props.totalFrequency) : null;

	return (
		<dl>
			<dt>{totalLabeling}</dt>
			<dd>{totalData}</dd>
			<dt>{DieSymbol[props.mode]} Frequency</dt>
			<dd>{new Intl.NumberFormat("en-Us").format(positiveFrequency)}</dd>
			<dt>Probability of {DieSymbol[props.mode]}</dt>
			<dd>{new Intl.NumberFormat("en-Us", { minimumFractionDigits: 4 }).format((positiveFrequency / props.totalFrequency) * 100)}%</dd>
			<dt>{DieSymbol[props.counterMode]} Frequency</dt>
			<dd>{new Intl.NumberFormat("en-Us").format(negativeFrequency)}</dd>
			<dt>Probability of {DieSymbol[props.counterMode]}</dt>
			<dd>{new Intl.NumberFormat("en-Us", { minimumFractionDigits: 4 }).format((negativeFrequency / props.totalFrequency) * 100)}%</dd>
			<dt>Average {DieSymbol[props.mode]}</dt>
			<dd>{new Intl.NumberFormat("en-Us", { minimumFractionDigits: 4 }).format(average)}</dd>
			<dt>Standard Deviation</dt>
			<dd>{new Intl.NumberFormat("en-Us", { minimumFractionDigits: 4 }).format(standardDeviation)}</dd>
		</dl>
	);
};
