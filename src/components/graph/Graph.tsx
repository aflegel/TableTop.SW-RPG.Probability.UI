import * as React from "react";
import { DieSymbol, DieType, PoolDice, PoolCombinationState, PoolCombinationStatistic } from "../../services/DiceModels";
import { Line } from "react-chartjs-2";
import GraphBreakdown from "./GraphBreakdown";
import GraphDetails from "./GraphDetails";
import GraphLine from "./GraphLine";

// At runtime, Redux will merge together...
type GraphProps =
    PoolCombinationState & IGraphProps;        // ... state we've requested from the Redux store // ... plus incoming routing parameters

    export interface IGraphProps {
		mode: DieSymbol;
	}

export default class Graph extends React.Component<GraphProps, {}>  {
 	/**
	 * Configures the data for a given symbol and renders a graph and a statistics breakdown panel
	 */
    public render(){
		if (this.props.poolCombinationContainer != null && this.props.poolCombinationContainer.baseline != null) {

			//get short list of combinations ordered lowest to highest
			let baseSet = this.props.poolCombinationContainer.baseline.poolCombinationStatistics.filter(f => f.symbol == this.props.mode)
				.sort((n1, n2) => n1.quantity - n2.quantity);

			//from short list get quantities
			let xAxis = baseSet.map(map => map.quantity.toString());
			let totalFrequency = baseSet.reduce((total, obj) => { return total + obj.frequency }, 0);
			let percentageSet = baseSet.map(map => this.GetProbability(map.frequency, totalFrequency));
			let averageSet = baseSet.map(map => map.alternateTotal / map.frequency);

			let datasets = [Graph.BuildDataSet(percentageSet, DieSymbol[this.props.mode], "#58125A", "Probability")];
			let lineData = { labels: xAxis, datasets: datasets };

			let counterMode: DieSymbol = DieSymbol.Failure;
			let offLabel: string = "";
			switch (this.props.mode) {
				case DieSymbol.Success:
					counterMode = DieSymbol.Failure;
					offLabel = "Average Advantage";
					datasets = datasets.concat(Graph.BuildDataSet(averageSet, offLabel, "#8D4A8F", "Average"));
					break;
				case DieSymbol.Advantage:
					counterMode = DieSymbol.Threat;
					offLabel = "Average Success";
					datasets = datasets.concat(Graph.BuildDataSet(averageSet, offLabel, "#8D4A8F", "Average"));
					break;
				case DieSymbol.Triumph:
					counterMode = DieSymbol.Despair;
					break;
			}

			return <div className="row row-fill">
				<div className="col s12">
					<h3>Distribution of {DieSymbol[this.props.mode]} and {DieSymbol[counterMode]}</h3>

					<div className="row">
						<div className="col l6 m8 s12">
							<GraphLine label={DieSymbol[this.props.mode]} offLabel={offLabel} mode={this.props.mode} graphData={lineData} ></GraphLine>
						</div>
						<div className="col l3 m4 s6">
						    <GraphBreakdown mode={this.props.mode} counterMode={counterMode} baseSet={baseSet} totalFrequency={totalFrequency}></GraphBreakdown>
						</div>
						<div className="col l3 m4 s6">
                            <GraphDetails mode={this.props.mode}></GraphDetails>
						</div>
					</div>
				</div>
			</div>;
		}
		else{
			return <></>;
		}
    }

	/**
	 * Returns a standardized object for the chart.js utility
	 * @param dataset
	 * @param label
	 * @param color
	 */
	private static BuildDataSet(dataset: number[], label: string, color: string, yAxisId: string) {
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
		}
    }

    	/**
	 * Calculates the probability returned as a number between 0 and 100
	 * @param top
	 * @param bottom
	 */
	private GetProbability(numerator: number, denominator: number): number {
		return numerator / denominator * 100;
	}
}
