import { DieType } from "../../../Models/DieType";

export const RemoveDieAction = "REMOVE_DIE";
export type RemoveDieAction = typeof RemoveDieAction;

export interface IRemoveDie {
	type: RemoveDieAction;
	dieType: DieType;
}
