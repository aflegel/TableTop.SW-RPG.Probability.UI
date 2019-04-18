import React, { FunctionComponent } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, Label, ResponsiveContainer } from "recharts";
import { DieSymbol } from "../../Models/DieSymbol";
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
export const GraphLine: FunctionComponent<IGraphLineProps> = (props: IGraphLineProps) => {
	const AverageExists = (): boolean => props.mode === DieSymbol.Success || props.mode === DieSymbol.Advantage;

	const BuildData = (): ILineData[] => props.filteredSet.map(map => ({
		quantity: map.quantity,
		probability: GetProbability(map.frequency, props.totalFrequency),
		average: AverageExists() ? map.alternateTotal / map.frequency : undefined
	}));

	const GetAverageAxis = () => {
		if (AverageExists()) {
			return <Line yAxisId="average" name={AverageLabel(props.alternateMode)} type="monotone" dataKey="average" stroke="#8D4A8F" strokeWidth={5} />;
		} else {
			return <></>;
		}
	};

	const GetAverageLine = () => {
		if (AverageExists()) {
			return (
				<YAxis yAxisId="average" type="number" orientation="right">
					<Label value={AverageLabel(props.alternateMode)} angle={-90} position="insideRight" />
				</YAxis>
			);
		} else {
			return <></>;
		}
	};

	const GetDataSets = () => {
		if (props.filteredSet && props.filteredSet.length > 0) {
			return <Line yAxisId="probability" name="Probability (%)" type="monotone" dataKey="probability" stroke="#58125A" strokeWidth={5} />;
		} else {
			return <></>;
		}
	}

	const ValueFormatter = (value: any, name: any, props: any) => [Format(value, true), name];

	const LabelFormatter = (label: string | number) => `${NetLabel(props.mode)}: ${label}`;

	return (
		<ResponsiveContainer minWidth={300} minHeight={300} maxHeight={400}>
			<LineChart data={BuildData()}>
				<XAxis dataKey="quantity">
					<Label value={NetLabel(props.mode)} offset={0} position="insideBottom" />
				</XAxis>
				<YAxis yAxisId="probability" type="number">
					<Label value="Probability (%)" angle={-90} position="insideLeft" />
				</YAxis>
				<Tooltip formatter={ValueFormatter} labelFormatter={LabelFormatter} />
				<Legend verticalAlign="top" />
				{GetDataSets()}
				{GetAverageLine()}
				{GetAverageAxis()}
			</LineChart>
		</ResponsiveContainer>
	);

};
