import { IStatisticsState } from "./StatisticState";
import { StatisticsApiActions } from "./Actions";
import { FetchStatisticsAction } from "./Actions/FetchStatistics";
import { AddDieAction } from "./Actions/AddDie";
import { RemoveDieAction } from "./Actions/RemoveDie";
import { DieType } from "../../Models/DieType";
import { PoolDice } from "../../Models/PoolDice";

export const reducer = (state: IStatisticsState, action: StatisticsApiActions) => {
	switch (action.type) {
		case FetchStatisticsAction:
			if (action.poolCombinationContainer.baseDice) {
				return {
					...state,
					poolCombinationContainer: action.poolCombinationContainer,
					searchDice: action.poolCombinationContainer.baseDice.slice(),
					isLoading: false
				};
			} else {
				return {
					...state,
					isLoading: false
				};
			}
		case AddDieAction:
			const addDice = CopyDice(state.searchDice);

			switch (action.poolDie.dieId) {
				case DieType.Ability:
				case DieType.Proficiency:
					if (
						addDice
							.filter(f => f.dieId == DieType.Ability || f.dieId == DieType.Proficiency)
							.reduce((total, obj) => {
								return total + obj.quantity;
							}, 0) < 6
					)
						MergeDice(addDice, action.poolDie);
					break;
				case DieType.Boost:
					if (
						addDice
							.filter(f => f.dieId == DieType.Boost)
							.reduce((total, obj) => {
								return total + obj.quantity;
							}, 0) < 4
					)
						MergeDice(addDice, action.poolDie);
					break;
				case DieType.Difficulty:
				case DieType.Challenge:
					if (
						addDice
							.filter(f => f.dieId == DieType.Difficulty || f.dieId == DieType.Challenge)
							.reduce((total, obj) => {
								return total + obj.quantity;
							}, 0) < 6
					)
						MergeDice(addDice, action.poolDie);
					break;
				case DieType.Setback:
					if (
						addDice
							.filter(f => f.dieId == DieType.Setback)
							.reduce((total, obj) => {
								return total + obj.quantity;
							}, 0) < 4
					)
						MergeDice(addDice, action.poolDie);
					break;
			}

			return {
				...state,
				poolCombinationContainer: state.poolContainer,
				searchDice: addDice,
				isLoading: false
			};
		case RemoveDieAction:
			const removeDice = CopyDice(state.searchDice);
			const existingRecord = removeDice.find(f => f.dieId == action.poolDie.dieId);

			if (existingRecord != null) {
				if (existingRecord.quantity > 1) existingRecord.quantity -= action.poolDie.quantity;
				else removeDice.splice(removeDice.indexOf(existingRecord), 1);
			}

			return {
				...state,
				poolCombinationContainer: state.poolContainer,
				searchDice: removeDice,
				isLoading: false
			};
		default:
			return state;
	}
};

export function FormatDice(dice: PoolDice[]): string {
	return "{" + dice.map(map => "{" + map.dieId + "," + map.quantity + "}").join(",") + "}";
}

export function CopyDice(dice: PoolDice[]): PoolDice[] {
	const replication: PoolDice[] = [];

	dice.forEach(item => replication.push({ dieId: item.dieId, quantity: item.quantity }));

	return replication;
}

export function MergeDice(dice: PoolDice[], addDie: PoolDice) {
	const existingRecord = dice.find(f => f.dieId == addDie.dieId);

	if (existingRecord != null) existingRecord.quantity += addDie.quantity;
	else dice.push(addDie);
}
