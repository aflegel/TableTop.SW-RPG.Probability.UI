import React, { FunctionComponent, useEffect } from "react";
import { Grid, Card, CardContent, Typography, List, ListItem } from "@material-ui/core";

import { Graph } from "./Graph";
import { Search } from "./Search";
import { DieSymbol } from "../Models";
import { useStatistics } from "../Hooks/SearchStatistics";
import { Dice } from "./Dice/Dice";

export const Statistics: FunctionComponent = () => {
	const { state, getStatisticsAsync } = useStatistics();

	const getDice = () => {
		if (state.poolCombination && state.poolCombination.dice) {
			return <Dice dice={state.poolCombination.dice} />;
		} else {
			return <></>;
		}
	};

	useEffect(() => {
		getStatisticsAsync(state.searchDice);
	}, []);

	return (
		<Grid container spacing={10}>
			<Grid item xs={12}>
				<Search {...state} searchCallback={getStatisticsAsync} />
			</Grid>
			<Grid item xs={12}>
				<Card>
					<CardContent>
						<Typography gutterBottom variant="h2" component="h2">
							Probability Breakdown
						</Typography>
						<Typography gutterBottom variant="h5" component="h2">
							{getDice()}
						</Typography>
						<List>
							<ListItem divider>
								<Graph {...state} mode={DieSymbol.Success} />
							</ListItem>
							<ListItem divider>
								<Graph {...state} mode={DieSymbol.Advantage} />
							</ListItem>
							<ListItem divider>
								<Graph {...state} mode={DieSymbol.Triumph} />
							</ListItem>
							<ListItem>
								<Graph {...state} mode={DieSymbol.Despair} />
							</ListItem>
						</List>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};
