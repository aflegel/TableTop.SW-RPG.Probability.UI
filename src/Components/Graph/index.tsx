import React, { FunctionComponent } from "react";
import { GraphBreakdown } from "./Breakdown";
import { GraphDetails } from "./Details";
import { GraphLine, IGraphLineData, IGraphData } from "./Line";
import { DieSymbol } from "../../Models/DieSymbol";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";

type GraphProps = IStatisticsState & IGraphProps;

export interface IGraphProps {
	mode: DieSymbol;
}

export const Graph: FunctionComponent<GraphProps> = (props: GraphProps) => {
	/**
	 * Calculates the probability returned as a number between 0 and 100
	 * @param top
	 * @param bottom
	 */
	const GetProbability = (numerator: number, denominator: number): number => (numerator / denominator) * 100;

	/**
	 * Returns a standardized object for the chart.js utility
	 * @param dataset
	 * @param label
	 * @param color
	 */
	const BuildDataSet = (dataset: number[], label: string, color: string, yAxisId: string): IGraphLineData => {
		return {
			label: label,
			yAxisID: yAxisId,
			pointBackgroundColor: color,
			borderColor: color,
			pointHoverBackgroundColor: color,
			fill: false,
			pointRadius: 5,
			pointHitRadius: 10,
			pointHoverRadius: 10,
			data: dataset
		};
	};

	/**
	 * Configures the data for a given symbol and renders a graph and a statistics breakdown panel
	 */
	if (props.poolContainer != null && props.poolContainer.baseline != null) {
		//get short list of combinations ordered lowest to highest
		let baseSet = props.poolContainer.baseline.poolStatistics.filter(f => f.symbol == props.mode).sort((n1, n2) => n1.quantity - n2.quantity);

		//from short list get quantities
		let xAxis = baseSet.map(map => map.quantity.toString());
		let totalFrequency = baseSet.reduce((total, obj) => {
			return total + obj.frequency;
		}, 0);
		let percentageSet = baseSet.map(map => GetProbability(map.frequency, totalFrequency));
		let averageSet = baseSet.map(map => map.alternateTotal / map.frequency);

		let datasets: IGraphLineData[] = [BuildDataSet(percentageSet, DieSymbol[props.mode], "#58125A", "Probability")];
		let lineData: IGraphData = { labels: xAxis, datasets: datasets };

		let counterMode: DieSymbol = DieSymbol.Failure;
		let offLabel: string = "";
		switch (props.mode) {
			case DieSymbol.Success:
				counterMode = DieSymbol.Failure;
				offLabel = "Average Advantage";
				datasets = datasets.concat(BuildDataSet(averageSet, offLabel, "#8D4A8F", "Average"));
				break;
			case DieSymbol.Advantage:
				counterMode = DieSymbol.Threat;
				offLabel = "Average Success";
				datasets = datasets.concat(BuildDataSet(averageSet, offLabel, "#8D4A8F", "Average"));
				break;
			case DieSymbol.Triumph:
				counterMode = DieSymbol.Despair;
				break;
		}

		return (
			<div className="row row-fill">
				<div className="col s12">
					<h3>
						Distribution of {DieSymbol[props.mode]} and {DieSymbol[counterMode]}
					</h3>

					<div className="row">
						<div className="col l6 m8 s12">
							<GraphLine label={DieSymbol[props.mode]} offLabel={offLabel} mode={props.mode} graphData={lineData} />
						</div>
						<div className="col l3 m4 s6">
							<GraphBreakdown mode={props.mode} counterMode={counterMode} baseSet={baseSet} totalFrequency={totalFrequency} />
						</div>
						<div className="col l3 m4 s6">
							<GraphDetails mode={props.mode} />
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <></>;
	}
};
