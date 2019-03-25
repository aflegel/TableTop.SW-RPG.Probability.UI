import * as React from "react";
import { DieSymbol, DieType, PoolDice, PoolCombinationState, PoolCombinationStatistic } from "../../services/DiceModels";
import { Line } from "react-chartjs-2";

// At runtime, Redux will merge together...
type GraphProps =
    PoolCombinationState;        // ... state we've requested from the Redux store // ... plus incoming routing parameters
    
export default class Graph extends React.Component<GraphProps, {}>  {

    public render(){
        return <></>;
    }

	/**
	 * Renders a standardized chart.js graph given a dataset.
	 * @param label
	 * @param graphData
	 */
	public static RenderGraph(label: string, offLabel: string, mode: DieSymbol, graphData: any) {

		var yAxes = [{
			id: "Probability",
			position: "left",
			scaleLabel: {
				display: true,
				labelString: "Probability (%)"
			}
		}
		];

		if (mode == DieSymbol.Advantage || mode == DieSymbol.Success) {
			yAxes = yAxes.concat({
				id: "Average",
				position: "right",
				scaleLabel: {
					display: true,
					labelString: offLabel
				}
			});
		}

		const options = {
			title: {
				display: true,
				text: "Distribution of " + label,
			},
			legend: {
				display: true
			},
			scales: {
				yAxes: yAxes,
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Net " + label
					}
				}]
			}
		}

		return <Line data={graphData} options={options} />;
    }

    /**
	 * Configures the data for a given symbol and renders a graph and a statistics breakdown panel
	 * @param mode
	 */
	private RenderGraphAndData(mode: DieSymbol) {
		if (this.props.poolCombinationContainer != null && this.props.poolCombinationContainer.baseline != null) {

			//get short list of combinations ordered lowest to highest
			var baseSet = this.props.poolCombinationContainer.baseline.poolCombinationStatistics.filter(f => f.symbol == mode).sort((n1, n2) => n1.quantity - n2.quantity);

			//from short list get quantities
			var xAxis = baseSet.map(map => map.quantity.toString());
			var totalFrequency = baseSet.reduce((total, obj) => { return total + obj.frequency }, 0);
			var percentageSet = baseSet.map(map => this.GetProbability(map.frequency, totalFrequency));
			var averageSet = baseSet.map(map => map.alternateTotal / map.frequency);

			var datasets = [Graph.BuildDataSet(percentageSet, DieSymbol[mode], "#58125A", "Probability")];

			var counterMode: DieSymbol = DieSymbol.Failure;
			var offLabel: string = "";
			switch (mode) {
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
					<h3>Distribution of {DieSymbol[mode]} and {DieSymbol[counterMode]}</h3>

					<div className="row">
						<div className="col l6 m8 s12">
							{Graph.RenderGraph(DieSymbol[mode], offLabel, mode, { labels: xAxis, datasets: datasets })}
						</div>
						<div className="col l3 m4 s6">
							{this.RenderBreakdown(mode, counterMode, baseSet, totalFrequency)}
						</div>
						<div className="col l3 m4 s6">
							{this.RenderAdditionalDetails(mode)}
						</div>
					</div>
				</div>

			</div>;
		}
	}

	/**
	 * Returns a standardized object for the chart.js utility
	 * @param dataset
	 * @param label
	 * @param color
	 */
	public static BuildDataSet(dataset: number[], label: string, color: string, yAxisId: string) {
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
