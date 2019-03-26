import { PoolDice } from "../../../Models/PoolDice";

export const RemoveDieAction = "REMOVE_DIE";
export type RemoveDieAction = typeof RemoveDieAction;

export interface IRemoveDie {
	type: RemoveDieAction;
	poolDie: PoolDice;
}
