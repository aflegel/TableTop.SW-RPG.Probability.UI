import { DieSymbol, PoolCombinationStatistic } from "../../Models/PoolContainer";
import * as React from "react";

type GraphBreakdownProps = IGraphBreakdownProps; // ... state we've requested from the Redux store // ... plus incoming routing parameters

export interface IGraphBreakdownProps {
	mode: DieSymbol;
	counterMode: DieSymbol;
	baseSet: PoolCombinationStatistic[];
	totalFrequency: number;
}

export default class GraphBreakdown extends React.Component<GraphBreakdownProps, {}> {
	/**
	 * Calculates the statictical model and builds a definition list for that data
	 */
	public render = () => {
		const positiveSet = this.props.baseSet.filter(f => f.quantity > 0);
		//success mode requires 0 quantity outcomes as well
		const negativeSet = this.props.baseSet.filter(f => f.quantity < (this.props.mode == DieSymbol.Success ? 1 : 0));

		const positiveFrequency = positiveSet.reduce((total, obj) => {
			return total + obj.frequency;
		}, 0);
		const negativeFrequency = negativeSet.reduce((total, obj) => {
			return total + obj.frequency;
		}, 0);

		const average =
			this.props.baseSet.reduce((total, obj) => {
				return total + obj.quantity * obj.frequency;
			}, 0) / this.props.totalFrequency;
		//val - avg squared * qty
		const deviationSet = this.props.baseSet.map(map => (map.quantity - average) ** 2 * map.frequency);
		const standardDeviation = Math.sqrt(
			deviationSet.reduce((total, obj) => {
				return total + obj;
			}, 0) / this.props.totalFrequency
		);

		const totalLabeling = this.props.mode == DieSymbol.Success ? "Total Frequency" : "";
		const totalData = this.props.mode == DieSymbol.Success ? new Intl.NumberFormat("en-Us").format(this.props.totalFrequency) : null;

		return (
			<>
				<dl>
					<dt>{totalLabeling}</dt>
					<dd>{totalData}</dd>
					<dt>{DieSymbol[this.props.mode]} Frequency</dt>
					<dd>{new Intl.NumberFormat("en-Us").format(positiveFrequency)}</dd>
					<dt>Probability of {DieSymbol[this.props.mode]}</dt>
					<dd>{new Intl.NumberFormat("en-Us", { minimumFractionDigits: 4 }).format((positiveFrequency / this.props.totalFrequency) * 100)}%</dd>
					<dt>{DieSymbol[this.props.counterMode]} Frequency</dt>
					<dd>{new Intl.NumberFormat("en-Us").format(negativeFrequency)}</dd>
					<dt>Probability of {DieSymbol[this.props.counterMode]}</dt>
					<dd>{new Intl.NumberFormat("en-Us", { minimumFractionDigits: 4 }).format((negativeFrequency / this.props.totalFrequency) * 100)}%</dd>
					<dt>Average {DieSymbol[this.props.mode]}</dt>
					<dd>{new Intl.NumberFormat("en-Us", { minimumFractionDigits: 4 }).format(average)}</dd>
					<dt>Standard Deviation</dt>
					<dd>{new Intl.NumberFormat("en-Us", { minimumFractionDigits: 4 }).format(standardDeviation)}</dd>
				</dl>
			</>
		);
	};
}
