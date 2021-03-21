import React, { useEffect, ReactElement } from "react";
import { Grid, Card, CardContent, Typography, List, ListItem, makeStyles, createStyles } from "@material-ui/core";
import { Graph } from "./Graph";
import { Search } from "./Search";
import { useStatistics } from "../Hooks/SearchStatistics";
import { StatisticsResponse } from "./StatisticsResponse";
import { ResultListContainer } from "./ResultList";
import { DieSymbol } from "../Models";
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

const list: DieSymbol[] = ["Success", "Advantage", "Triumph", "Despair"];

export const Statistics = (): ReactElement => {
	const { statistics, getStatisticsAsync, getResultsAsync } = useStatistics();
	const classes = useStyles();

	const fetchResults = () => getResultsAsync(statistics.poolCombination.dice);

	useEffect(() => {
		getStatisticsAsync(statistics.searchDice);
	}, [statistics.searchDice]);

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={12}>
					<Search searchDice={statistics.searchDice} searchCallback={getStatisticsAsync} />
				</Grid>
				<Grid item xs={12} className={classes.bottomSpace}>
					<Card>
						<CardContent>
							<Typography gutterBottom variant="h2" component="h2">
								<FormattedMessage id="ProbabilityHeader" />
							</Typography>
							<Typography gutterBottom variant="h5" component="h2">
								<StatisticsResponse statistics={statistics} />
							</Typography>
							<List>
								{list.map((graph) => (
									<ListItem divider key={graph}>
										<Graph {...statistics} mode={graph} />
									</ListItem>
								))}
								<ListItem>
									<ResultListContainer {...statistics} resultCallback={fetchResults} />
								</ListItem>
							</List>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};
