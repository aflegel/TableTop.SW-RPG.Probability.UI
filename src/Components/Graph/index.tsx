import React, { FunctionComponent } from "react";
import { GraphBreakdown } from "./Breakdown";
import { GraphDetails } from "./Details";
import { GraphLine } from "./Line";
import { DieSymbol } from "../../Models/DieSymbol";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { PoolStatistic } from "../../Models/PoolStatistic";

type GraphProps = IStatisticsState & IGraphProps;

export interface IGraphProps {
	mode: DieSymbol;
}

export const Graph: FunctionComponent<GraphProps> = (props: GraphProps) => {
	/**
	 * Configures the data for a given symbol and renders a graph and a statistics breakdown panel
	 */

	let filteredSet: PoolStatistic[] = [];
	if (props.poolContainer.baseline)
		filteredSet = props.poolContainer.baseline.poolStatistics.filter(f => f.symbol == props.mode).sort((n1, n2) => n1.quantity - n2.quantity);

	const totalFrequency = filteredSet.reduce((total, obj) => { return total + obj.frequency; }, 0);
	let counterMode: DieSymbol = DieSymbol.Failure;
	let offLabel: string = "";
	switch (props.mode) {
		case DieSymbol.Success:
			counterMode = DieSymbol.Failure;
			offLabel = "Average Advantage";
			break;
		case DieSymbol.Advantage:
			counterMode = DieSymbol.Threat;
			offLabel = "Average Success";
			break;
		case DieSymbol.Triumph:
			counterMode = DieSymbol.Despair;
			break;
	}

	return <div className="row row-fill">
		<div className="col m12">
			<h3>
				Distribution of {DieSymbol[props.mode]} and {DieSymbol[counterMode]}
			</h3>

			<div className="row">
				<div className="col l6 m12">
					<GraphLine mode={props.mode} label={DieSymbol[props.mode]} offLabel={offLabel} filteredSet={filteredSet} totalFrequency={totalFrequency} />
				</div>
				<div className="col l3 m6">
					<GraphBreakdown mode={props.mode} counterMode={counterMode} filteredSet={filteredSet} totalFrequency={totalFrequency} />
				</div>
				<div className="col l3 m6">
					<GraphDetails mode={props.mode} />
				</div>
			</div>
		</div>
	</div>
};
