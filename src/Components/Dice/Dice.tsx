import React, { FunctionComponent, ReactElement } from "react";
import { PoolDice } from "../../Models";
import { DieSeries } from "./DieSeries";

export interface DiceProps {
	dice: PoolDice[];
}

/**
 * Returns a sorted array of icons for the given dice set
 */
export const Dice: FunctionComponent<DiceProps> = (props: DiceProps): ReactElement => {
	const dieSorter = (a: PoolDice, b: PoolDice): number => {
		switch (a.dieType) {
			case "Proficiency":
				return -1;
			case "Ability":
				switch (b.dieType) {
					case "Boost":
						return -1;
					default:
						return 1;
				}
			case "Boost":
				return 1;
			case "Challenge":
				switch (b.dieType) {
					case "Difficulty":
					case "Setback":
						return -1;
					default:
						return 1;
				}
			case "Difficulty":
				switch (b.dieType) {
					case "Setback":
						return -1;
					default:
						return 1;
				}
			case "Setback":
				return 1;
			default:
				return 0;
		}
	};

	if (props.dice) {
		return <>{props.dice.sort(dieSorter).map(item => <DieSeries dice={item} key={`${item.dieType}${item.quantity}`} />)}</>;
	}
	else {
		return <></>;
	}
};
