import React, { FunctionComponent, ReactElement } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, Label, ResponsiveContainer } from "recharts";
import { AverageLabel, NetLabel, GetProbability, IsBlank, ValueFormatter } from "./Functions";
import { IModeProps, IDataSetProps, IExtendedModeProps } from ".";

export type IGraphLineProps = IModeProps & IExtendedModeProps & IDataSetProps;

export interface ILineData {
	quantity: number;
	probability: number;
	average?: number;
}

/**
 * Renders a standardized chart.js graph given a dataset.
 */
export const GraphLine: FunctionComponent<IGraphLineProps> = (props: IGraphLineProps): ReactElement => {
	const hasData: boolean = props.filteredSet && props.filteredSet.length > 0;

	const buildData = (): ILineData[] => props.filteredSet.map(map => ({
		quantity: map.quantity,
		probability: GetProbability(map.frequency, props.totalFrequency),
		average: !IsBlank(props.alternateMode) ? map.alternateTotal / map.frequency : undefined
	}));

	const getAverageAxis = (): ReactElement => <Line yAxisId="average" name={AverageLabel(props.alternateMode)} type="monotone" dataKey="average" stroke="#8D4A8F" strokeWidth={5} />;

	const getDataSets = (): ReactElement => <Line yAxisId="probability" name="Probability (%)" type="monotone" dataKey="probability" stroke="#58125A" strokeWidth={5} />;

	const getAverageLine = (): ReactElement =>
		<YAxis yAxisId="average" type="number" orientation="right">
			<Label value={AverageLabel(props.alternateMode)} angle={-90} position="insideRight" />
		</YAxis>;

	const labelFormatter = (label: string | number): string => `${NetLabel(props.mode)}: ${label}`;

	return (
		<ResponsiveContainer minWidth={300} minHeight={300} maxHeight={400}>
			<LineChart data={buildData()}>
				<XAxis dataKey="quantity">
					<Label value={NetLabel(props.mode)} offset={0} position="insideBottom" />
				</XAxis>
				<YAxis yAxisId="probability" type="number">
					<Label value="Probability (%)" angle={-90} position="insideLeft" />
				</YAxis>
				<Tooltip formatter={ValueFormatter} labelFormatter={labelFormatter} />
				<Legend verticalAlign="top" />
				{hasData && getDataSets()}
				{hasData && !IsBlank(props.alternateMode) && getAverageLine()}
				{hasData && !IsBlank(props.alternateMode) && getAverageAxis()}
			</LineChart>
		</ResponsiveContainer>
	);
};
