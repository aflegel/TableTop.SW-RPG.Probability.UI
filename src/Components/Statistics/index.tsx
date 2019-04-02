import React, { FunctionComponent, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

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
		<div>
			<Search {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} searchCallback={getStatisticsAsync} />

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

			<StatisticsResultList {...state} />
		</div>
	);
};
