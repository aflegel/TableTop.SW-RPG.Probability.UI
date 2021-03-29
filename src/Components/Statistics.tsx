import React, { useEffect, ReactElement } from "react";
import { Grid, Card, CardContent, Typography, List, ListItem, makeStyles, createStyles } from "@material-ui/core";
import { Graph } from "./Graph";
import { Search } from "./Search";
import { useStatistics } from "../Hooks/StatisticsApi";
import { StatisticsResponse } from "./StatisticsResponse";
import { ResultListContainer } from "./ResultList";
import { DieSymbol, PoolDice } from "../Models";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		bottomSpace: {
			margin: "40px 0",
		},
	})
);

export const InitialState: PoolDice[] = [
	{ dieType: "Ability", quantity: 1 },
	{ dieType: "Difficulty", quantity: 1 },
];

const modes: DieSymbol[] = ["Success", "Advantage", "Triumph", "Despair"];

export const Statistics = (): ReactElement => {
	const { statistics, getStatisticsAsync } = useStatistics();
	const classes = useStyles();

	useEffect(() => {
		getStatisticsAsync(InitialState);
	}, []);

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={12}>
					<Search dice={InitialState} searchCallback={getStatisticsAsync} />
				</Grid>
				<Grid item xs={12} className={classes.bottomSpace}>
					<Card>
						<CardContent>
							<Typography gutterBottom variant="h2" component="h1">
								<FormattedMessage id="ProbabilityHeader" />
							</Typography>
							<Typography gutterBottom variant="h5" component="h2">
								<StatisticsResponse dice={statistics.dice} />
							</Typography>
							<List>
								{modes.map((graph) => (
									<Graph poolCombination={statistics} mode={graph} key={graph} />
								))}
								{!!statistics.dice.length && (
									<ListItem>
										<ResultListContainer dice={statistics.dice} />
									</ListItem>
								)}
							</List>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};
