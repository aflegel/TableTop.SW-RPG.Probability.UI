import React, { FunctionComponent } from "react";
import { Grid, Card, CardContent, CardActions, Button } from "@material-ui/core";

import { DieIncrementer } from "./Incrementer";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieType } from "../../Models/DieType";
import { PoolDice } from "../../Models/PoolDice";
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
export const Search: FunctionComponent<SearchProps> = (props: SearchProps) => {
	const [state, setState] = React.useState<ISearchState>({
		dice: props.searchDice,
	});

	const updateState = (dice: PoolDice[]): void => {
		setState({ dice: dice });
	}

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
			const existingRecord = dice.find(f => f.dieId == addDie);

			if (existingRecord) {
				existingRecord.quantity += 1;
			}
			else {
				dice.push({ dieId: addDie, quantity: 1 });
			}
		};

		const dice = state.dice.slice();

		switch (dieType) {
			case DieType.Ability:
			case DieType.Proficiency:
				if (GetQuantityTotal(dice.filter(f => f.dieId == DieType.Ability || f.dieId == DieType.Proficiency)) < 6) {
					updateQuantity(dice, dieType);
				}
				break;
			case DieType.Boost:
				if (GetQuantityTotal(dice.filter(f => f.dieId == DieType.Boost)) < 4) {
					updateQuantity(dice, dieType);
				}
				break;
			case DieType.Difficulty:
			case DieType.Challenge:
				if (GetQuantityTotal(dice.filter(f => f.dieId == DieType.Difficulty || f.dieId == DieType.Challenge)) < 6) {
					updateQuantity(dice, dieType);
				}
				break;
			case DieType.Setback:
				if (GetQuantityTotal(dice.filter(f => f.dieId == DieType.Setback)) < 4) {
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
		const existingRecord = dice.find(f => f.dieId == dieType);

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
			<Grid container spacing={24}>
				<Grid item xs={6} sm={4} md={2} className="content-centered">
					<DieIncrementer {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} dieType={DieType.Proficiency} />
				</Grid>
				<Grid item xs={6} sm={4} md={2} className="content-centered">
					<DieIncrementer {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} dieType={DieType.Challenge} />
				</Grid>
				<Grid item xs={6} sm={4} md={2} className="content-centered">
					<DieIncrementer {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} dieType={DieType.Ability} />
				</Grid>
				<Grid item xs={6} sm={4} md={2} className="content-centered">
					<DieIncrementer {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} dieType={DieType.Difficulty} />
				</Grid>
				<Grid item xs={6} sm={4} md={2} className="content-centered">
					<DieIncrementer {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} dieType={DieType.Boost} />
				</Grid>
				<Grid item xs={6} sm={4} md={2} className="content-centered">
					<DieIncrementer {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} dieType={DieType.Setback} />
				</Grid>
			</Grid>
			<CardActions>
				<Button color="primary" onClick={() => { props.searchCallback(state.dice) }}>Search</Button>
			</CardActions>
		</CardContent>
	</Card>
};
