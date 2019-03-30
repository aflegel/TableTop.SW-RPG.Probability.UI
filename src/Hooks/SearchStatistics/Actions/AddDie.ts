import { DieType } from "../../../Models/DieType";

export const AddDieAction = "ADD_DIE";
export type AddDieAction = typeof AddDieAction;

export interface IAddDie {
	type: AddDieAction;
	dieType: DieType;
}
