import React, { useEffect, ReactElement } from "react";
import { Grid, Card, CardContent, Typography, List, ListItem, makeStyles, createStyles } from "@material-ui/core";

import { Graph } from "./Graph";
import { Search } from "./Search";
import { useStatistics } from "../Hooks/SearchStatistics";
import { Dice } from "./Dice/Dice";
import { ResultListContainer } from "./ResultList";

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		bottomSpace: {
			margin: "40px 0"
		}
	})
);

export const Statistics = (): ReactElement => {
	const { statistics, getStatisticsAsync, getResultsAsync } = useStatistics();
	const classes = useStyles();

	const hasData = statistics.poolCombination && statistics.poolCombination.dice;

	const fetchResults = () => getResultsAsync(statistics.poolCombination.dice);

	useEffect(() => {
		getStatisticsAsync(statistics.searchDice);
	}, []);

	return (<div className={classes.root}>
		<Grid container>
			<Grid item xs={12}>
				<Search {...statistics} searchCallback={getStatisticsAsync} />
			</Grid>
			<Grid item xs={12} className={classes.bottomSpace}>
				<Card>
					<CardContent>
						<Typography gutterBottom variant="h2" component="h2">
							Probability Breakdown
						</Typography>
						<Typography gutterBottom variant="h5" component="h2">
							{hasData && <Dice dice={statistics.poolCombination.dice} />}
							{!hasData && <p>No data was returned for the query</p>}
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
