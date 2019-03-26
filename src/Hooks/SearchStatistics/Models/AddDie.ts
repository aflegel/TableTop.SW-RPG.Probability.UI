import { PoolDice } from "../../../Models/PoolDice";

export const AddDieAction = "ADD_DIE";
export type AddDieAction = typeof AddDieAction;

export interface IAddDie {
	type: AddDieAction;
	poolDie: PoolDice;
}
