import React, { FunctionComponent, ReactElement } from "react";
import { Die } from "./Die";
import { DieType, PoolDice } from "../../Models";

export interface IDieSeriesProps {
	dice: PoolDice;
}

/**
 * Returns a set icons for the die and quantity
 */
export const DieSeries: FunctionComponent<IDieSeriesProps> = (props: IDieSeriesProps): ReactElement => {
	const output: JSX.Element[] = [];

	for (let i = 0; i < props.dice.quantity; i++) {
		output.push(<Die ariaLabel={props.dice.dieType} dieType={props.dice.dieType} key={`${props.dice.dieType}${i}`} />);
	}

	return <>{output}</>;
};
