import React, { ReactElement, useState } from "react";
import { Grid, Card, CardContent, CardActions, Button, makeStyles, createStyles } from "@material-ui/core";

import { DieIncrementer } from "./Incrementer";
import { DieType, PoolDice } from "../../Models";
import { AddDice, RemoveDice } from "./Functions";
import { DiceContext } from "../Dice/DiceContext";
import { FormattedMessage } from "react-intl";

interface SearchCallbackProps {
	dice: PoolDice[];
	searchCallback: (param: PoolDice[]) => void;
}

const useStyles = makeStyles(() =>
	createStyles({
		contentCentered: {
			textAlign: "center",
		},
	})
);

const list: DieType[] = ["Proficiency", "Challenge", "Ability", "Difficulty", "Boost", "Setback"];

/**
 * Renders the current search icons as well as a search builder
 */
export const Search = (props: SearchCallbackProps): ReactElement => {
	const [state, setState] = useState(props.dice);
	const classes = useStyles();

	/**
	 * Increases the quantity or adds a new die to the list
	 * @param dieType
	 */
	const addSearchDie = (dieType: DieType): void => {
		const dice = AddDice(dieType, state.slice());

		if (dice.length) setState(dice);
	};

	/**
	 * Reduces the search dice by 1 or removing the die from the pool
	 * @param dieType
	 */
	const removeSearchDie = (dieType: DieType): void => {
		const dice = RemoveDice(dieType, state.slice());

		if (dice.length) setState(dice);
	};

	return (
		<Card>
			<DiceContext.Provider value={state}>
				<CardContent>
					<Grid container spacing={10}>
						{list.map((incrementer) => (
							<Grid item xs={6} sm={4} md={2} className={classes.contentCentered} key={incrementer}>
								<DieIncrementer addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} dieType={incrementer} />
							</Grid>
						))}
					</Grid>
					<CardActions>
						<Button
							color="primary"
							onClick={(): void => {
								props.searchCallback(state);
							}}
						>
							<FormattedMessage id="Search" />
						</Button>
					</CardActions>
				</CardContent>
			</DiceContext.Provider>
		</Card>
	);
};
