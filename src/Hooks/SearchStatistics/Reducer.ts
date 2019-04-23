import { IStatisticsState } from "./StatisticState";
import { StatisticsApiActions } from "./Actions";
import { FetchStatisticsAction } from "./Actions/FetchStatistics";
import { AddDieAction } from "./Actions/AddDie";
import { RemoveDieAction } from "./Actions/RemoveDie";
import { DieType } from "../../Models/DieType";
import { PoolDice } from "../../Models/PoolDice";
import { GetQuantityTotal } from "../../Components/Graph/Functions";

export const reducer = (state: IStatisticsState, action: StatisticsApiActions): IStatisticsState => {
	const mergeDice = (dice: PoolDice[], addDie: DieType): void => {
		const existingRecord = dice.find(f => f.dieId == addDie);

		if (existingRecord) {
			existingRecord.quantity += 1;
		}
		else {
			dice.push({ dieId: addDie, quantity: 1 });
		}
	};

	switch (action.type) {
		case FetchStatisticsAction:
			if (action.poolCombination) {
				return {
					...state,
					poolCombination: action.poolCombination,
					isLoading: false
				};
			} else {
				return {
					...state,
					poolCombination: {
						poolStatistics: [],
						dice: []
					},
					isLoading: false
				};
			}
		case AddDieAction:
			const addDice = state.searchDice.slice();

			switch (action.dieType) {
				case DieType.Ability:
				case DieType.Proficiency:
					if (GetQuantityTotal(addDice.filter(f => f.dieId == DieType.Ability || f.dieId == DieType.Proficiency)) < 6) mergeDice(addDice, action.dieType);
					break;
				case DieType.Boost:
					if (GetQuantityTotal(addDice.filter(f => f.dieId == DieType.Boost)) < 4) mergeDice(addDice, action.dieType);
					break;
				case DieType.Difficulty:
				case DieType.Challenge:
					if (GetQuantityTotal(addDice.filter(f => f.dieId == DieType.Difficulty || f.dieId == DieType.Challenge)) < 6) mergeDice(addDice, action.dieType);
					break;
				case DieType.Setback:
					if (GetQuantityTotal(addDice.filter(f => f.dieId == DieType.Setback)) < 4) mergeDice(addDice, action.dieType);
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
				if (existingRecord.quantity > 1) {
					existingRecord.quantity -= 1;
				}
				else {
					removeDice.splice(removeDice.indexOf(existingRecord), 1);
				}
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
