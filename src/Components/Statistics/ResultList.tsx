import React, { FunctionComponent } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";

import { PoolCombination } from "../../Models/PoolCombination";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieSymbol } from "../../Models/DieSymbol";
import { Format } from "../Graph/Formatter";

/**
 * Renders a table with the raw data used for populating the tables and statistics data
 */
export const StatisticsResultList: FunctionComponent<IStatisticsState> = (props: IStatisticsState) => {
	let containers: PoolCombination[] = [];

	if (props.poolCombination) containers.push(props.poolCombination);

	return (
		<Card className={""}>
			<CardContent>
				<Typography gutterBottom variant="h3" component="h2">
					Result Table
				</Typography>
				<Table className={""}>
					<TableHead>
						<TableRow>
							<TableCell>Symbol</TableCell>
							<TableCell align="right">Quantity</TableCell>
							<TableCell align="right">Frequency</TableCell>
							<TableCell align="right">Alternate Total</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{containers.map(poolCombination =>
							poolCombination.poolStatistics.map(combination => (
								<TableRow>
									<TableCell>{DieSymbol[combination.symbol]}</TableCell>
									<TableCell align="right">{combination.quantity}</TableCell>
									<TableCell align="right">{Format(combination.frequency, false)}</TableCell>
									<TableCell align="right">{Format(combination.alternateTotal, false)}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
