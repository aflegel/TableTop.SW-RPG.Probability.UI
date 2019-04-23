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

	const mergeDice = (dice: PoolDice[], addDie: DieType): void => {
		const existingRecord = dice.find(f => f.dieId == addDie);

		if (existingRecord) {
			existingRecord.quantity += 1;
		}
		else {
			dice.push({ dieId: addDie, quantity: 1 });
		}
	};

	const addSearchDie = (dieType: DieType) => {
		const addDice = state.dice.slice();

		switch (dieType) {
			case DieType.Ability:
			case DieType.Proficiency:
				if (GetQuantityTotal(addDice.filter(f => f.dieId == DieType.Ability || f.dieId == DieType.Proficiency)) < 6) mergeDice(addDice, dieType);
				break;
			case DieType.Boost:
				if (GetQuantityTotal(addDice.filter(f => f.dieId == DieType.Boost)) < 4) mergeDice(addDice, dieType);
				break;
			case DieType.Difficulty:
			case DieType.Challenge:
				if (GetQuantityTotal(addDice.filter(f => f.dieId == DieType.Difficulty || f.dieId == DieType.Challenge)) < 6) mergeDice(addDice, dieType);
				break;
			case DieType.Setback:
				if (GetQuantityTotal(addDice.filter(f => f.dieId == DieType.Setback)) < 4) mergeDice(addDice, dieType);
				break;
		}

		setState({
			...state,
			dice: addDice
		});
	};

	const removeSearchDie = (dieType: DieType) => {
		const removeDice = state.dice.slice();
		const existingRecord = removeDice.find(f => f.dieId == dieType);

		if (existingRecord) {
			if (existingRecord.quantity > 1) {
				existingRecord.quantity -= 1;
			}
			else {
				removeDice.splice(removeDice.indexOf(existingRecord), 1);
			}
		}

		setState({
			...state,
			dice: removeDice
		});
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
/*
case AddDieAction:

		case RemoveDieAction:

*/
