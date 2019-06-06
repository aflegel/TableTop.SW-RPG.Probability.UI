import React, { FunctionComponent } from "react";
import { PoolDice, DieType } from "../../Models";
import { DieSeries } from "./DieSeries";

export interface IDiceProps {
	dice: PoolDice[];
}

/**
 * Returns a sorted array of icons for the given dice set
 */
export const Dice: FunctionComponent<IDiceProps> = (props: IDiceProps) => {
	const output: JSX.Element[] = [];

	if (props.dice) {
		props.dice.sort((a, b) => {
			switch (a.dieId) {
				case DieType.Proficiency:
					return -1;
				case DieType.Ability:
					switch (b.dieId) {
						case DieType.Boost:
							return -1;
						default:
							return 1;
					}
				case DieType.Boost:
					return 1;
				case DieType.Challenge:
					switch (b.dieId) {
						case DieType.Difficulty:
						case DieType.Setback:
							return -1;
						default:
							return 1;
					}
				case DieType.Difficulty:
					switch (b.dieId) {
						case DieType.Setback:
							return -1;
						default:
							return 1;
					}
				case DieType.Setback:
					return 1;
				default:
					return 0;
			}
		}).forEach(item => output.push(<DieSeries dice={item} key={`${item.dieId}${item.quantity}`}></DieSeries>));
	}

	return <>{output}</>;
};
