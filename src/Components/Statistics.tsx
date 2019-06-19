import React, { FunctionComponent, useEffect, ReactElement } from "react";
import { Grid, Card, CardContent, Typography, List, ListItem, makeStyles, Theme, createStyles } from "@material-ui/core";

import { Graph } from "./Graph";
import { Search } from "./Search";
import { useStatistics } from "../Hooks/SearchStatistics";
import { Dice } from "./Dice/Dice";

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
	const { state, getStatisticsAsync } = useStatistics();
	const classes = useStyles();

	const getDice = (): ReactElement => <Dice dice={state.poolCombination.dice} />;

	const emptyDataReturn = (): ReactElement => <p>No data was returned for the query</p>;

	const hasData = state.poolCombination && state.poolCombination.dice;

	useEffect(() => {
		getStatisticsAsync(state.searchDice);
	}, []);

	return (<div className={classes.root}>
		<Grid container>
			<Grid item xs={12}>
				<Search {...state} searchCallback={getStatisticsAsync} />
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
								<Graph {...state} mode="Success" />
							</ListItem>
							<ListItem divider>
								<Graph {...state} mode="Advantage" />
							</ListItem>
							<ListItem divider>
								<Graph {...state} mode="Triumph" />
							</ListItem>
							<ListItem>
								<Graph {...state} mode="Despair" />
							</ListItem>
						</List>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	</div>
	);
};
