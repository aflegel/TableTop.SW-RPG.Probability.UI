import { PoolDice } from "../../Models";
import { DieType } from "../../Models";
import { GetQuantityTotal } from "../Graph/Functions";

/**
 * Increases the quantity or adds a new die to the list
 * @param dieType
 */
export const AddDice = (dieType: DieType, dice: PoolDice[]): PoolDice[] => {
	const existingRecord = dice.find(f => f.dieType === dieType);
	let count = 6;

	if (dieType === "Ability" || dieType === "Proficiency") {
		count = GetQuantityTotal(dice.filter(f => f.dieType === "Ability" || f.dieType === "Proficiency"));
	}
	else if (dieType === "Difficulty" || dieType === "Challenge") {
		count = GetQuantityTotal(dice.filter(f => f.dieType === "Difficulty" || f.dieType === "Challenge"));
	}
	else {
		count = GetQuantityTotal(dice.filter(f => f.dieType === dieType));
	}

	if (count >= 6) {
		return [];
	}

	if (existingRecord) {
		existingRecord.quantity += 1;
	}
	else {
		dice.push({ dieType: dieType, quantity: 1 });
	}

	return dice;
};

/**
 * Reduces the search dice by 1 or removing the die from the pool
 * @param dieType
 */
export const RemoveDice = (dieType: DieType, dice: PoolDice[]): PoolDice[] => {
	const existingRecord = dice.find(f => f.dieType === dieType);

	if (existingRecord) {
		if (existingRecord.quantity > 1) {
			existingRecord.quantity -= 1;
		}
		else {
			dice.splice(dice.indexOf(existingRecord), 1);
		}
	}

	return dice;
};
