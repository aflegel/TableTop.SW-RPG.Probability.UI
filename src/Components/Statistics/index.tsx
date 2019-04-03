import React, { FunctionComponent, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";

import { Graph } from "../Graph";
import { Search } from "../Search";
import { StatisticsResultList } from "./ResultList";
import { DieSymbol } from "../../Models/DieSymbol";
import { useStatistics } from "../../Hooks/SearchStatistics";
import { Dice } from "../Dice/Dice";

export const Statistics: FunctionComponent = () => {
	const { state, getStatisticsAsync, addSearchDie, removeSearchDie } = useStatistics();

	const GetDice = () => {
		if (state.poolCombination && state.poolCombination.dice) {
			return <Dice dice={state.poolCombination.dice} />;
		} else {
			return <></>;
		}
	};

	useEffect(() => {
		getStatisticsAsync();
	}, []);

	return (
		<Grid container spacing={24}>
			<Grid item xs={12}>
				<Search {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} searchCallback={getStatisticsAsync} />
			</Grid>
			<Grid item xs={12}>
				<Card className={""}>
					<CardContent>
						<Typography gutterBottom variant="h2" component="h2">
							Probability Breakdown
						</Typography>
						<Typography gutterBottom variant="h5" component="h2">
							{GetDice()}
						</Typography>
						<List>
							<ListItem divider>
								<Graph {...state} mode={DieSymbol.Success} />
							</ListItem>
							<ListItem divider>
								<Graph {...state} mode={DieSymbol.Advantage} />
							</ListItem>
							<ListItem>
								<Graph {...state} mode={DieSymbol.Triumph} />
							</ListItem>
						</List>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12}>
				<StatisticsResultList {...state} />
			</Grid>
		</Grid>
	);
};
