import React, { FunctionComponent } from "react";
import { Line, ChartData } from "react-chartjs-2";
import { DieSymbol } from "../../Models/DieSymbol";
import { bool } from "prop-types";

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

export interface IGraphAxes {
	id: string,
	position: string;
	scaleLabel: {
		display: boolean;
		labelString: string;
	};
}

export interface IGraphOptions {
	title: {
		display: boolean;
		text: string;
	};
	legend: {
		display: boolean;
	};
	scales: {
		yAxes: IGraphAxes[];
		xAxes: IGraphAxes[];
	}
}

export const GraphLine: FunctionComponent<IGraphLineProps> = (props: IGraphLineProps) => {
	/**
	 * Renders a standardized chart.js graph given a dataset.
	 */
	const getYAxes = (): IGraphAxes[] => {
		const yAxes: IGraphAxes[] = [
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
			yAxes.push({
				id: "Average",
				position: "right",
				scaleLabel: {
					display: true,
					labelString: props.offLabel
				}
			});
		}
		return yAxes;
	};

	const getOptions = (): IGraphOptions => {
		return {
			title: {
				display: true,
				text: "Distribution of " + props.label
			},
			legend: {
				display: true
			},
			scales: {
				yAxes: getYAxes(),
				xAxes: [
					{
						id: "Net",
						position: "bottom",
						scaleLabel: {
							display: true,
							labelString: "Net " + props.label
						}
					}
				]
			}
		}
	};

	return <Line data={props.graphData} options={getOptions()} />;
};
