import axios from "axios";

import { PoolDice } from "../../Models";
import { RollContainer } from "../../Models/Roll";
import { PoolCombination } from "../../Models/Statistics";
export interface IStatisticsService {
	GetAllAsync(dice: PoolDice[]): Promise<PoolCombination>;
	GetResultsAsync(dice: PoolDice[]): Promise<RollContainer>;
}

export class StatisticsService implements IStatisticsService {
	private fakeData: PoolCombination = {
		statistics: [
			{
				symbol: "Success",
				quantity: 1,
				frequency: 5,
				alternateTotal: 3
			},
			{
				symbol: "Success",
				quantity: 2,
				frequency: 6,
				alternateTotal: 1
			},
			{
				symbol: "Success",
				quantity: 3,
				frequency: 7,
				alternateTotal: -1
			},
			{
				symbol: "Success",
				quantity: 5,
				frequency: 8,
				alternateTotal: -3
			},

			{
				symbol: "Advantage",
				quantity: 1,
				frequency: 5,
				alternateTotal: 3
			},
			{
				symbol: "Advantage",
				quantity: 2,
				frequency: 6,
				alternateTotal: 1
			},
			{
				symbol: "Advantage",
				quantity: 3,
				frequency: 7,
				alternateTotal: -1
			},
			{
				symbol: "Advantage",
				quantity: 5,
				frequency: 8,
				alternateTotal: -3
			},
			{
				symbol: "Triumph",
				quantity: 1,
				frequency: 1,
				alternateTotal: 0
			},
			{
				symbol: "Triumph",
				quantity: 0,
				frequency: 99,
				alternateTotal: 0
			}
		],
		dice: [{ dieType: "Ability", quantity: 1 }, { dieType: "Proficiency", quantity: 1 }, { dieType: "Setback", quantity: 1 }]
	};

	public async GetAllAsync(dice: PoolDice[]): Promise<PoolCombination> {
		return new Promise<PoolCombination>(resolve => {
			axios.post(`http://localhost:62546/Search`, dice, { headers: { "Content-Type": "application/json; charset=utf-8" } }).then(result => resolve(result.data));
		});
	}

	public async GetResultsAsync(dice: PoolDice[]): Promise<RollContainer> {
		return new Promise<RollContainer>(resolve => {
			axios.post(`http://localhost:62546/Roll`, dice, { headers: { "Content-Type": "application/json; charset=utf-8" } }).then(result => resolve(result.data));
		});
	}
}

export const StatisticsServiceSingleton: IStatisticsService = new StatisticsService();
