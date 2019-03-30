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
			if (action.poolContainer.baseDice) {
				return {
					...state,
					poolContainer: action.poolContainer,
					searchDice: action.poolContainer.baseDice.slice(),
					isLoading: false
				};
			} else {
				return {
					...state,
					isLoading: false
				};
			}
		case AddDieAction:
			const addDice = state.searchDice.slice(); //CopyDice(state.searchDice);

			switch (action.dieType) {
				case DieType.Ability:
				case DieType.Proficiency:
					if (
						addDice
							.filter(f => f.dieId == DieType.Ability || f.dieId == DieType.Proficiency)
							.reduce((total, obj) => {
								return total + obj.quantity;
							}, 0) < 6
					)
						MergeDice(addDice, action.dieType);
					break;
				case DieType.Boost:
					if (
						addDice
							.filter(f => f.dieId == DieType.Boost)
							.reduce((total, obj) => {
								return total + obj.quantity;
							}, 0) < 4
					)
						MergeDice(addDice, action.dieType);
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
						MergeDice(addDice, action.dieType);
					break;
				case DieType.Setback:
					if (
						addDice
							.filter(f => f.dieId == DieType.Setback)
							.reduce((total, obj) => {
								return total + obj.quantity;
							}, 0) < 4
					)
						MergeDice(addDice, action.dieType);
					break;
			}

			return {
				...state,
				searchDice: addDice,
				isLoading: false
			};
		case RemoveDieAction:
			const removeDice = state.searchDice.slice();
			const existingRecord = removeDice.find(f => f.dieId == action.dieType);

			if (existingRecord) {
				if (existingRecord.quantity > 1) existingRecord.quantity -= 1;
				else removeDice.splice(removeDice.indexOf(existingRecord), 1);
			}

			return {
				...state,
				searchDice: removeDice,
				isLoading: false
			};
		default:
			return state;
	}
};

export function MergeDice(dice: PoolDice[], addDie: DieType) {
	const existingRecord = dice.find(f => f.dieId == addDie);

	if (existingRecord) existingRecord.quantity += 1;
	else dice.push({ dieId: addDie, quantity: 1 });
}
