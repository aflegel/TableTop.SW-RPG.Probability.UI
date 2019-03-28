import React, { FunctionComponent } from "react";
import { Line, ChartData } from "react-chartjs-2";
import { DieSymbol } from "../../Models/DieSymbol";

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

export const GraphLine: FunctionComponent<IGraphLineProps> = (props: IGraphLineProps) => {
	/**
	 * Renders a standardized chart.js graph given a dataset.
	 */
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

	if (props.mode == DieSymbol.Advantage || props.mode == DieSymbol.Success) {
		yAxes = yAxes.concat({
			id: "Average",
			position: "right",
			scaleLabel: {
				display: true,
				labelString: props.offLabel
			}
		});
	}

	const options = {
		title: {
			display: true,
			text: "Distribution of " + props.label
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
						labelString: "Net " + props.label
					}
				}
			]
		}
	};

	return <Line data={props.graphData} options={options} />;
};
