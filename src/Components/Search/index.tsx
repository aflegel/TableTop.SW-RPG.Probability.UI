import React, { FunctionComponent, ReactElement } from "react";
import { Grid, Card, CardContent, CardActions, Button } from "@material-ui/core";

import { DieIncrementer } from "./Incrementer";
import { IStatisticsState } from "../../Hooks/SearchStatistics";
import { DieType, PoolDice } from "../../Models";
import { GetQuantityTotal } from "../Graph/Functions";

type SearchProps = IStatisticsState & ISearchProps;

export interface ISearchProps {
	searchCallback: Function;
}

export interface ISearchState {
	dice: PoolDice[];
}

/**
 * Renders the current search icons as well as a search builder
 */
export const Search: FunctionComponent<SearchProps> = (props: SearchProps): ReactElement => {
	const [state, setState] = React.useState<ISearchState>({
		dice: props.searchDice,
	});

	const updateState = (dice: PoolDice[]): void => {
		setState({ dice: dice });
	};

	/**
	 * Increases the quantity or adds a new die to the list
	 * @param dieType
	 */
	const addSearchDie = (dieType: DieType): void => {
		/**
		 * Handles adding or updating the poolDice
		 * @param dice passed by reference so a return is not required
		 * @param addDie
		 */
		const updateQuantity = (dice: PoolDice[], addDie: DieType): void => {
			const existingRecord = dice.find(f => f.dieType === addDie);

			if (existingRecord) {
				existingRecord.quantity += 1;
			}
			else {
				dice.push({ dieType: addDie, quantity: 1 });
			}
		};

		const dice = state.dice.slice();

		switch (dieType) {
			case "Ability":
			case "Proficiency":
				if (GetQuantityTotal(dice.filter(f => f.dieType === "Ability" || f.dieType === "Proficiency")) < 6) {
					updateQuantity(dice, dieType);
				}
				break;
			case "Boost":
				if (GetQuantityTotal(dice.filter(f => f.dieType === "Boost")) < 4) {
					updateQuantity(dice, dieType);
				}
				break;
			case "Difficulty":
			case "Challenge":
				if (GetQuantityTotal(dice.filter(f => f.dieType === "Difficulty" || f.dieType === "Challenge")) < 6) {
					updateQuantity(dice, dieType);
				}
				break;
			case "Setback":
				if (GetQuantityTotal(dice.filter(f => f.dieType === "Setback")) < 4) {
					updateQuantity(dice, dieType);
				}
				break;
		}

		updateState(dice);
	};

	/**
	 * Reduces the search dice by 1 or removing the die from the pool
	 * @param dieType
	 */
	const removeSearchDie = (dieType: DieType): void => {
		const dice = state.dice.slice();
		const existingRecord = dice.find(f => f.dieType === dieType);

		if (existingRecord) {
			if (existingRecord.quantity > 1) {
				existingRecord.quantity -= 1;
			}
			else {
				dice.splice(dice.indexOf(existingRecord), 1);
			}
		}

		updateState(dice);
	};

	return <Card>
		<CardContent>
			<Grid container spacing={10}>
				<Grid item xs={6} sm={4} md={2} className="content-centered">
					<DieIncrementer {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} dieType="Proficiency" />
				</Grid>
				<Grid item xs={6} sm={4} md={2} className="content-centered">
					<DieIncrementer {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} dieType="Challenge" />
				</Grid>
				<Grid item xs={6} sm={4} md={2} className="content-centered">
					<DieIncrementer {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} dieType="Ability" />
				</Grid>
				<Grid item xs={6} sm={4} md={2} className="content-centered">
					<DieIncrementer {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} dieType="Difficulty" />
				</Grid>
				<Grid item xs={6} sm={4} md={2} className="content-centered">
					<DieIncrementer {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} dieType="Boost" />
				</Grid>
				<Grid item xs={6} sm={4} md={2} className="content-centered">
					<DieIncrementer {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} dieType="Setback" />
				</Grid>
			</Grid>
			<CardActions>
				<Button color="primary" onClick={(): void => { props.searchCallback(state.dice); }}>Search</Button>
			</CardActions>
		</CardContent>
	</Card>;
};
