import React, { ReactElement } from "react";
import { Grid, Card, CardContent, CardActions, Button, makeStyles, createStyles } from "@material-ui/core";

import { DieIncrementer } from "./Incrementer";
import { StatisticsState } from "../../Hooks/SearchStatistics";
import { DieType, PoolDice } from "../../Models";
import { AddDice, RemoveDice } from "./Functions";
import { DiceContext } from "../DiceContext";


type SearchProps = StatisticsState & SearchCallbackProps;
export interface SearchCallbackProps {
	searchCallback: Function;
}

const useStyles = makeStyles(() =>
	createStyles({
		contentCentered: {
			textAlign: "center",
		}
	}),
);

/**
 * Renders the current search icons as well as a search builder
 */
export const Search = (props: SearchProps): ReactElement => {
	const [state, setState] = React.useState<PoolDice[]>(props.searchDice);

	const classes = useStyles();

	/**
	 * Increases the quantity or adds a new die to the list
	 * @param dieType
	 */
	const addSearchDie = (dieType: DieType): void => {

		const dice = AddDice(dieType, state.slice());

		if (dice.length)
			setState(dice);
	};

	/**
	 * Reduces the search dice by 1 or removing the die from the pool
	 * @param dieType
	 */
	const removeSearchDie = (dieType: DieType): void => {
		const dice = RemoveDice(dieType, state.slice());

		if (dice.length)
			setState(dice);
	};

	const list: DieType[] = ["Proficiency", "Challenge", "Ability", "Difficulty", "Boost", "Setback"];


	return <Card>
		<DiceContext.Provider value={state}>
			<CardContent>
				<Grid container spacing={10}>
					{
						list.map(incrementer => (
							<Grid item xs={6} sm={4} md={2} className={classes.contentCentered} key={incrementer}>
								<DieIncrementer addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} dieType={incrementer} />
							</Grid>
						))
					}
				</Grid>
				<CardActions>
					<Button color="primary" onClick={(): void => { props.searchCallback(state); }}>Search</Button>
				</CardActions>
			</CardContent>
		</DiceContext.Provider>
	</Card>;
};
