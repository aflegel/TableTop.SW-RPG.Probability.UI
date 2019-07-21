import React, { ReactElement } from "react";
import { Die } from "./Die";
import { PoolDice } from "../../Models";

export interface DieSeriesProps {
	dice: PoolDice;
}

/**
 * Returns a set icons for the die and quantity
 */
export const DieSeries = (props: DieSeriesProps): ReactElement => {
	const output: ReactElement[] = [];

	for (let i = 0; i < props.dice.quantity; i++) {
		output.push(<Die ariaLabel={props.dice.dieType} dieType={props.dice.dieType} key={`${props.dice.dieType}${i}`} />);
	}

	return <>{output}</>;
};
