import * as React from "react";
import { DieSymbol } from "../../Models/PoolContainer";
import { Line, ChartData } from "react-chartjs-2";

// At runtime, Redux will merge together...
type GraphLineProps = IGraphLineProps; // ... state we've requested from the Redux store // ... plus incoming routing parameters

export interface IGraphLineProps {
	label: string;
	offLabel: string;
	mode: DieSymbol;
	graphData: ChartData<IGraphData>;
}

export interface IGraphLineData {
	label: string;
	yAxisID: string;
	pointBackgroundColor: string;
	borderColor: string;
	pointHoverBackgroundColor: string;
	fill: boolean;
	pointRadius: number;
	pointHitRadius: number;
	pointHoverRadius: number;
	data: number[];
}

export interface IGraphData {
	labels: string[];
	datasets: IGraphLineData[];
}

export default class GraphLine extends React.Component<GraphLineProps, {}> {
	/**
	 * Renders a standardized chart.js graph given a dataset.
	 */
	public render() {
		let yAxes = [
			{
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
				text: "Distribution of " + this.props.label
			},
			legend: {
				display: true
			},
			scales: {
				yAxes: yAxes,
				xAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: "Net " + this.props.label
						}
					}
				]
			}
		};

		return <Line data={this.props.graphData} options={options} />;
	}
}
