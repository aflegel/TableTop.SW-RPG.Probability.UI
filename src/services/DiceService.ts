import { PoolContainer } from "../Models/PoolContainer";

export interface IStatisticsService {
	getAllAsync(): Promise<PoolContainer>;
}

export class StatisticsService implements IStatisticsService {
	private fakeData: PoolContainer = {
		baseline: {
			poolCombinationStatistics: [],
			positivePoolDice: [],
			negativePoolDice: []
		}
	};

	public async getAllAsync(): Promise<PoolContainer> {
		return new Promise<PoolContainer>(resolve => {
			setTimeout(() => resolve(this.fakeData), 500);
		});
	}
}

export const statisticsServiceSingleton: IStatisticsService = new StatisticsService();
