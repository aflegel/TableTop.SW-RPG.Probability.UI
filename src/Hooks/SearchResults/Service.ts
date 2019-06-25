import axios from "axios";

import { PoolDice, PoolCombination } from "../../Models";
import { PoolResult } from "../../Models/PoolResult";

export interface IResultsService {
	GetAllAsync(dice: PoolDice[]): Promise<PoolResult>;
}

export class ResultsService implements IResultsService {
	public async GetAllAsync(dice: PoolDice[]): Promise<PoolResult> {
		return new Promise<PoolResult>(resolve => {
			axios.post(`http://localhost:62546/Roll`, dice, { headers: { "Content-Type": "application/json; charset=utf-8" } }).then(result => resolve(result.data));
		});
	}
}

export const ResultServiceSingleton: IResultsService = new ResultsService();
