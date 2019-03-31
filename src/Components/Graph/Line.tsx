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

const data = [{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400, },
{ name: 'Page B', uv: 3000, pv: 1398, amt: 2210, },
{ name: 'Page C', uv: 2000, pv: 9800, amt: 2290, },
{ name: 'Page D', uv: 2780, pv: 3908, amt: 2000, },
{ name: 'Page E', uv: 1890, pv: 4800, amt: 2181, },
{ name: 'Page F', uv: 2390, pv: 3800, amt: 2500, },
{ name: 'Page G', uv: 3490, pv: 4300, amt: 2100, },
];

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
		<CartesianGrid strokeDasharray="3 3" />
		<XAxis dataKey="quantity" label={`Net ${props.label}`} />
		<YAxis yAxisId="left" label={props.label} />
		<YAxis yAxisId="right" label={props.offLabel} orientation="right" />
		<Tooltip />
		<Legend />
		<Line yAxisId="left" type="monotone" dataKey="probability" stroke="#8884d8" />
		<Line yAxisId="right" type="monotone" dataKey="altAverage" stroke="#82ca9d" />
	</LineChart>
};
