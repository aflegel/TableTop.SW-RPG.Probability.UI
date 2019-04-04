import React, { FunctionComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardActions, Button } from "@material-ui/core";

import { DieIncrementer } from "./Incrementer";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieType } from "../../Models/DieType";

type SearchProps = IStatisticsState & ISearchProps;

export interface ISearchProps {
	addDieCallback: Function;
	removeDieCallback: Function;
	searchCallback: Function;
}

/**
 * Renders the current search icons as well as a search builder
 */
export const Search: FunctionComponent<SearchProps> = (props: SearchProps) => {
	return (
		<Card className={""}>
			<CardContent>
				<Grid container spacing={24}>
					<Grid item xs={6} sm={4} md={2}>
						<DieIncrementer {...props} dieType={DieType.Proficiency} />
					</Grid>
					<Grid item xs={6} sm={4} md={2}>
						<DieIncrementer {...props} dieType={DieType.Challenge} />
					</Grid>
					<Grid item xs={6} sm={4} md={2}>
						<DieIncrementer {...props} dieType={DieType.Ability} />
					</Grid>
					<Grid item xs={6} sm={4} md={2}>
						<DieIncrementer {...props} dieType={DieType.Difficulty} />
					</Grid>
					<Grid item xs={6} sm={4} md={2}>
						<DieIncrementer {...props} dieType={DieType.Boost} />
					</Grid>
					<Grid item xs={6} sm={4} md={2}>
						<DieIncrementer {...props} dieType={DieType.Setback} />
					</Grid>
				</Grid>
				<CardActions>
					<Button
						color="primary"
						onClick={() => {
							props.searchCallback();
						}}
					>
						Search
					</Button>
				</CardActions>
			</CardContent>
		</Card>
	);
};
