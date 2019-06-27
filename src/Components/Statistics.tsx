import React, { FunctionComponent, useEffect, ReactElement } from "react";
import { Grid, Card, CardContent, Typography, List, ListItem, makeStyles, Theme, createStyles } from "@material-ui/core";

import { Graph } from "./Graph";
import { Search } from "./Search";
import { useStatistics } from "../Hooks/SearchStatistics";
import { Dice } from "./Dice/Dice";
import { RollResultList } from "./ResultList";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		bottomSpace: {
			margin: "40px 0"
		}
	}),
);

export const Statistics: FunctionComponent = (): ReactElement => {
	const { statistics, getStatisticsAsync, getResultsAsync } = useStatistics();
	const classes = useStyles();

	const getDice = (): ReactElement => <Dice dice={statistics.poolCombination.dice} />;

	const emptyDataReturn = (): ReactElement => <p>No data was returned for the query</p>;

	const hasData = statistics.poolCombination && statistics.poolCombination.dice;

	useEffect(() => {
		getStatisticsAsync(statistics.searchDice);
	}, []);

	return (<div className={classes.root}>
		<Grid container>
			<Grid item xs={12}>
				<Search {...statistics} searchCallback={getStatisticsAsync} resultsCallback={getResultsAsync} />
			</Grid>
			<Grid item xs={12} className={classes.bottomSpace}>
				<Card>
					<CardContent className={classes.bottomSpace}>
						<RollResultList poolRoll={statistics.poolRoll.positiveRolls}></RollResultList>
						<RollResultList poolRoll={statistics.poolRoll.negativeRolls}></RollResultList>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} className={classes.bottomSpace}>
				<Card>
					<CardContent>
						<Typography gutterBottom variant="h2" component="h2">
							Probability Breakdown
						</Typography>
						<Typography gutterBottom variant="h5" component="h2">
							{hasData && getDice()}
							{!hasData && emptyDataReturn()}
						</Typography>
						<List>
							<ListItem divider>
								<Graph {...statistics} mode="Success" />
							</ListItem>
							<ListItem divider>
								<Graph {...statistics} mode="Advantage" />
							</ListItem>
							<ListItem divider>
								<Graph {...statistics} mode="Triumph" />
							</ListItem>
							<ListItem>
								<Graph {...statistics} mode="Despair" />
							</ListItem>
						</List>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	</div>
	);
};
