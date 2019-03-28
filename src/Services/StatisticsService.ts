import { PoolContainer } from "../Models/PoolContainer";
import { DieSymbol } from "../Models/DieSymbol";
import { DieType } from "../Models/DieType";

export interface IStatisticsService {
	getAllAsync(): Promise<PoolContainer>;
}

export class StatisticsService implements IStatisticsService {
	private fakeData: PoolContainer = {
		baseline: {
			poolCombinationStatistics: [
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
				}
				,
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
			positivePoolDice: [{ dieId: DieType.Ability, quantity: 1 }, { dieId: DieType.Proficiency, quantity: 1 }],
			negativePoolDice: [{ dieId: DieType.Setback, quantity: 1 }]
		},
		baseDice: [{ dieId: DieType.Ability, quantity: 1 }, { dieId: DieType.Proficiency, quantity: 1 }, { dieId: DieType.Setback, quantity: 1 }]
	};

	public async getAllAsync(): Promise<PoolContainer> {
		return new Promise<PoolContainer>(resolve => {
			/*fetch(`api/Search/GetStatistics?data=${data}`)*/
			setTimeout(() => resolve(this.fakeData), 500);
		});
	}
}

export const statisticsServiceSingleton: IStatisticsService = new StatisticsService();
