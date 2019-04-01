import React, { FunctionComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Label, ResponsiveContainer, ReferenceArea } from "recharts";
import { PoolStatistic } from "../../Models/PoolStatistic";
import { DieSymbol } from "../../Models/DieSymbol";

export interface IGraphLineProps {
	label: string;
	offLabel: string;
	mode: DieSymbol;
	totalFrequency: number;
	filteredSet: PoolStatistic[];
}

export interface ILineData {
	quantity: number;
	probability: number;
	average?: number;
}

/**
 * Renders a standardized chart.js graph given a dataset.
 */
export const GraphLine: FunctionComponent<IGraphLineProps> = (props: IGraphLineProps) => {
	/**
	 * Calculates the probability returned as a number between 0 and 100
	 * @param top
	 * @param bottom
	 */
	const GetProbability = (numerator: number, denominator: number): number => (numerator / denominator) * 100;

	const AverageExists = (): boolean => props.mode === DieSymbol.Success || props.mode === DieSymbol.Advantage;

	const BuildData = (): ILineData[] => {
		return props.filteredSet.map(map => ({
			quantity: map.quantity,
			probability: GetProbability(map.frequency, props.totalFrequency),
			average: AverageExists() ? map.alternateTotal / map.frequency : undefined
		}));
	};

	const GetAverageAxis = () => {
		if (AverageExists()) {
			return <Line yAxisId="average" name={props.offLabel} type="monotone" dataKey="average" stroke="#8D4A8F" strokeWidth={5} />;
		} else {
			return <></>;
		}
	};

	const GetAverageLine = () => {
		if (AverageExists()) {
			return (
				<YAxis yAxisId="average" type="number" orientation="right">
					<Label value={props.offLabel} angle={-90} />
				</YAxis>
			);
		} else {
			return <></>;
		}
	};

	if (props.filteredSet && props.filteredSet.length > 0) {
		return (
			<ResponsiveContainer minWidth={300} minHeight={400}>
				<LineChart data={BuildData()}>
					<XAxis dataKey="quantity">
						<Label value={`Net ${props.label}`} offset={0} position="insideBottom" />
					</XAxis>
					<YAxis yAxisId="probability" type="number">
						<Label value="Probability (%)" angle={-90} position="left" />
					</YAxis>
					<Tooltip label={`Net ${props.label}`} />
					<Legend verticalAlign="top" />
					<Line yAxisId="probability" name={props.label} type="monotone" dataKey="probability" stroke="#58125A" strokeWidth={5} />
					{GetAverageLine()}
					{GetAverageAxis()}
				</LineChart>
			</ResponsiveContainer>
		);
	} else {
		return <></>;
	}
};
