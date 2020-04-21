import React, { ReactElement, useContext } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, Label, ResponsiveContainer } from "recharts";
import { AverageLabel, NetLabel, GetProbability, IsBlank, ValueFormatter } from "./Functions";
import { ModeContext } from "./ModeContext";
import { DataContext } from "./DataContext";

/**
 * Renders a standardized chart.js graph given a dataset.
 */
export const GraphLine = (): ReactElement => {
	const { filteredSet, totalFrequency } = useContext(DataContext);
	const { mode, alternateMode } = useContext(ModeContext);

	const hasData = filteredSet?.length;

	const mappedDataSet = filteredSet.map(map => ({
		quantity: map.quantity,
		probability: GetProbability(map.frequency, totalFrequency),
		average: !IsBlank(alternateMode) ? map.alternateTotal / map.frequency : undefined
	}));

	const labelFormatter = (label: string | number): string => `${NetLabel(mode)}: ${label}`;

	return <ResponsiveContainer minWidth={300} minHeight={300} maxHeight={400}>
		<LineChart data={mappedDataSet}>
			<XAxis dataKey="quantity">
				<Label value={NetLabel(mode)} offset={0} position="insideBottom" />
			</XAxis>
			<YAxis yAxisId="probability" type="number">
				<Label value="Probability (%)" angle={-90} position="insideLeft" />
			</YAxis>
			<Tooltip formatter={ValueFormatter} labelFormatter={labelFormatter} />
			<Legend verticalAlign="top" />
			{hasData && <Line yAxisId="probability" name="Probability (%)" type="monotone" dataKey="probability" stroke="#58125A" strokeWidth={5} />}
			{
				hasData && !IsBlank(alternateMode) &&
				<YAxis yAxisId="average" type="number" orientation="right">
					<Label value={AverageLabel(alternateMode)} angle={-90} position="insideRight" />
				</YAxis>
			}
			{
				hasData && !IsBlank(alternateMode) &&
				<Line yAxisId="average" name={AverageLabel(alternateMode)} type="monotone" dataKey="average" stroke="#8D4A8F" strokeWidth={5} />
			}
		</LineChart>
	</ResponsiveContainer>;
};
