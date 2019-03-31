import React, { FunctionComponent } from "react";
import { DieSymbol } from "../../Models/DieSymbol";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { PoolStatistic } from "../../Models/PoolStatistic";

export interface IGraphLineProps {
	label: string;
	offLabel: string;
	mode: DieSymbol;
	totalFrequency: number;
	filteredData: PoolStatistic[]
}

export interface ILineData {
	quantity: number;
	probability: number;
	altAverage: number;
}

const GetProbability = (numerator: number, denominator: number): number => (numerator / denominator) * 100;

export const GraphLine: FunctionComponent<IGraphLineProps> = (props: IGraphLineProps) => {
	/**
	 * Renders a standardized chart.js graph given a dataset.
	 */

	const newData: ILineData[] = props.filteredData.map(map => ({
		quantity: map.quantity,
		probability: GetProbability(map.frequency, props.totalFrequency),
		altAverage: map.alternateTotal / map.frequency
	}));

	return <LineChart
		width={500}
		height={300}
		data={newData}
		margin={{
			top: 20, right: 50, left: 20, bottom: 5,
		}}
	>
		<XAxis dataKey="quantity" label={{ value: `Net ${props.label}`, position: 'bottom' }} />
		<YAxis yAxisId="left" label={{ value: props.label, angle: -90, position: 'left' }} />
		<YAxis yAxisId="right" label={{ value: props.offLabel, angle: -90 }} orientation="right" />
		<Tooltip label={`Net ${props.label}`} />
		<Legend margin={{ top: 36, left: 0, right: 0, bottom: 0 }} />
		<Line yAxisId="left" name={props.label} type="monotone" dataKey="probability" stroke="#58125A" />
		<Line yAxisId="right" name={props.offLabel} type="monotone" dataKey="altAverage" stroke="#8D4A8F" />
	</LineChart>
};
