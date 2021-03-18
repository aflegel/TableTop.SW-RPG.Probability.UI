import React, { ReactElement, useContext } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, Label, ResponsiveContainer } from "recharts";
import { GetProbability, IsBlank, ValueFormatter } from "./Functions";
import { ModeContext } from "./ModeContext";
import { DataContext } from "./DataContext";
import { useIntl } from "react-intl";

/**
 * Renders a standardized chart.js graph given a dataset.
 */
export const GraphLine = (): ReactElement => {
	const intl = useIntl();
	const { filteredSet, totalFrequency } = useContext(DataContext);
	const { mode, alternateMode } = useContext(ModeContext);

	const hasData = filteredSet?.length;

	const mappedDataSet = filteredSet.map((map) => ({
		quantity: map.quantity,
		probability: GetProbability(map.frequency, totalFrequency),
		average: !IsBlank(alternateMode) ? map.alternateTotal / map.frequency : undefined,
	}));

	const labelFormatter = (label: string | number): string => `${intl.formatMessage({ id: "DataTable.Net" }, { a: mode })}: ${label}`;

	return (
		<ResponsiveContainer minWidth={300} minHeight={300} maxHeight={400}>
			<LineChart data={mappedDataSet}>
				<XAxis dataKey="quantity">
					<Label value={intl.formatMessage({ id: "DataTable.Net" }, { a: mode })} offset={0} position="insideBottom" />
				</XAxis>
				<YAxis yAxisId="probability" type="number">
					<Label value={`${intl.formatMessage({ id: "Advanced.Probability" })} (%)`} angle={-90} position="insideLeft" />
				</YAxis>
				<Tooltip formatter={ValueFormatter} labelFormatter={labelFormatter} />
				<Legend verticalAlign="top" />
				{hasData && <Line yAxisId="probability" name={`${intl.formatMessage({ id: "Advanced.Probability" })} (%)`} type="monotone" dataKey="probability" stroke="#58125A" strokeWidth={5} />}
				{hasData && !IsBlank(alternateMode) && (
					<YAxis yAxisId="average" type="number" orientation="right">
						<Label value={intl.formatMessage({ id: "Breakdowns.Average" }, { a: alternateMode })} angle={-90} position="insideRight" />
					</YAxis>
				)}
				{hasData && !IsBlank(alternateMode) && (
					<Line yAxisId="average" name={intl.formatMessage({ id: "Breakdowns.Average" }, { a: alternateMode })} type="monotone" dataKey="average" stroke="#8D4A8F" strokeWidth={5} />
				)}
			</LineChart>
		</ResponsiveContainer>
	);
};
