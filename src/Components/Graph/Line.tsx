import React, { FunctionComponent, ReactElement } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, Label, ResponsiveContainer } from "recharts";
import { DieSymbol } from "../../Models";
import { Format, AverageLabel, NetLabel, GetProbability } from "./Functions";
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
	const hasAverage: boolean = props.mode === DieSymbol.Advantage || props.mode === DieSymbol.Success;
	const hasData: boolean = props.filteredSet && props.filteredSet.length > 0;

	const buildData = (): ILineData[] => props.filteredSet.map(map => ({
		quantity: map.quantity,
		probability: GetProbability(map.frequency, props.totalFrequency),
		average: hasAverage ? map.alternateTotal / map.frequency : undefined
	}));

	const getAverageAxis = (): ReactElement => {
		if (hasData && hasAverage) {
			return <Line yAxisId="average" name={AverageLabel(props.alternateMode)} type="monotone" dataKey="average" stroke="#8D4A8F" strokeWidth={5} />;
		} else {
			return <></>;
		}
	};

	const getAverageLine = (): ReactElement => {
		if (hasData && hasAverage) {
			return (
				<YAxis yAxisId="average" type="number" orientation="right">
					<Label value={AverageLabel(props.alternateMode)} angle={-90} position="insideRight" />
				</YAxis>
			);
		} else {
			return <></>;
		}
	};

	const getDataSets = (): ReactElement => {
		if (hasData) {
			return <Line yAxisId="probability" name="Probability (%)" type="monotone" dataKey="probability" stroke="#58125A" strokeWidth={5} />;
		} else {
			return <></>;
		}
	};

	const valueFormatter = (value: any, name: any, props: any): string[] => [Format(value, true), name];

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
				<Tooltip formatter={valueFormatter} labelFormatter={labelFormatter} />
				<Legend verticalAlign="top" />
				{getDataSets()}
				{getAverageLine()}
				{getAverageAxis()}
			</LineChart>
		</ResponsiveContainer>
	);
};
