import React, { FunctionComponent } from "react";
import { Die } from "./Die";
import { PoolDice } from "../../Models/PoolDice";
import { DieType } from "../../Models/DieType";

export interface IDiceProps {
	dice: PoolDice[];
}

/**
 * Returns an icon element with the appropriate css classes
 */
export const Dice: FunctionComponent<IDiceProps> = (props: IDiceProps) => {
	/**
	 * Returns a set icons with proper css classes for the die type and size
	 * @param dieType
	 * @param quantity
	 */
	const RenderDieSet = (dieType: DieType, quantity: number): JSX.Element[] => {
		const output: JSX.Element[] = [];

		for (let i = 0; i < quantity; i++) {
			output.push(<Die dieType={dieType} key={DieType[dieType] + i} />);
		}

		return output;
	};

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
		}).forEach(item => output.push(...RenderDieSet(item.dieId, item.quantity)));
	}
	return <>{output}</>;
};
