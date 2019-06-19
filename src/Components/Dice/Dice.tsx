import React, { FunctionComponent, ReactElement } from "react";
import { PoolDice, DieType } from "../../Models";
import { DieSeries } from "./DieSeries";

export interface IDiceProps {
	dice: PoolDice[];
}

/**
 * Returns a sorted array of icons for the given dice set
 */
export const Dice: FunctionComponent<IDiceProps> = (props: IDiceProps): ReactElement => {
	const output: JSX.Element[] = [];

	if (props.dice) {
		props.dice.sort((a, b) => {
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
		}).forEach(item => output.push(<DieSeries dice={item} key={`${item.dieType}${item.quantity}`} />));
	}

	return <>{output}</>;
};
