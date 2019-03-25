import * as React from "react";
import { DieSymbol, DieType, PoolDice, PoolCombinationState, PoolCombinationStatistic } from "../../services/DiceModels";
import { Line } from "react-chartjs-2";
import GraphBreakdown from "./GraphBreakdown";
import GraphDetails from "./GraphDetails";

// At runtime, Redux will merge together...
type GraphLineProps =
    IGraphLineProps;        // ... state we've requested from the Redux store // ... plus incoming routing parameters

    export interface IGraphLineProps {
		label: string;
		offLabel: string;
		mode: DieSymbol;
		graphData: any;
	}

export default class GraphLine extends React.Component<GraphLineProps, {}>  {
 	/**
	 * Renders a standardized chart.js graph given a dataset.
	 */
    public render(){
		var yAxes = [{
			id: "Probability",
			position: "left",
			scaleLabel: {
				display: true,
				labelString: "Probability (%)"
			}
		}
		];

		if (this.props.mode == DieSymbol.Advantage || this.props.mode == DieSymbol.Success) {
			yAxes = yAxes.concat({
				id: "Average",
				position: "right",
				scaleLabel: {
					display: true,
					labelString: this.props.offLabel
				}
			});
		}

		const options = {
			title: {
				display: true,
				text: "Distribution of " + this.props.label,
			},
			legend: {
				display: true
			},
			scales: {
				yAxes: yAxes,
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Net " + this.props.label
					}
				}]
			}
		}

		return <Line data={this.props.graphData} options={options} />;
    }
}
