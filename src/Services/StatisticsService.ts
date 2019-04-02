import axios from "axios";

import { DieSymbol } from "../Models/DieSymbol";
import { DieType } from "../Models/DieType";
import { PoolDice } from "../Models/PoolDice";
import { PoolCombination } from "../Models/PoolCombination";

export interface IStatisticsService {
	getAllAsync(dice: PoolDice[]): Promise<PoolCombination>;
}

export class StatisticsService implements IStatisticsService {
	private fakeData: PoolCombination = {
		poolStatistics: [
			{
				symbol: DieSymbol.Success,
				quantity: 1,
				frequency: 5,
				alternateTotal: 3
			},
			{
				symbol: DieSymbol.Success,
				quantity: 2,
				frequency: 6,
				alternateTotal: 1
			},
			{
				symbol: DieSymbol.Success,
				quantity: 3,
				frequency: 7,
				alternateTotal: -1
			},
			{
				symbol: DieSymbol.Success,
				quantity: 5,
				frequency: 8,
				alternateTotal: -3
			},

			{
				symbol: DieSymbol.Advantage,
				quantity: 1,
				frequency: 5,
				alternateTotal: 3
			},
			{
				symbol: DieSymbol.Advantage,
				quantity: 2,
				frequency: 6,
				alternateTotal: 1
			},
			{
				symbol: DieSymbol.Advantage,
				quantity: 3,
				frequency: 7,
				alternateTotal: -1
			},
			{
				symbol: DieSymbol.Advantage,
				quantity: 5,
				frequency: 8,
				alternateTotal: -3
			},
			{
				symbol: DieSymbol.Triumph,
				quantity: 1,
				frequency: 1,
				alternateTotal: 0
			},
			{
				symbol: DieSymbol.Triumph,
				quantity: 0,
				frequency: 99,
				alternateTotal: 0
			}
		],
		dice: [{ dieId: DieType.Ability, quantity: 1 }, { dieId: DieType.Proficiency, quantity: 1 }, { dieId: DieType.Setback, quantity: 1 }]
	};

	public async getAllAsync(dice: PoolDice[]): Promise<PoolCombination> {
		return new Promise<PoolCombination>(resolve => {
			const data = JSON.stringify(dice);

			axios.get(`http://localhost:62546/api/Search?data=${data}`).then(result => resolve(result.data));
		});
	}
}

export const statisticsServiceSingleton: IStatisticsService = new StatisticsService();
