import React, { FunctionComponent } from "react";
import { Die } from "./Die";
import { DieType } from "../../Models/DieType";
import { PoolDice } from "../../Models/PoolDice";

export interface IDieSeriesProps {
	dice: PoolDice;
}

/**
 * Returns a set icons for the die and quantity
 */
export const DieSeries: FunctionComponent<IDieSeriesProps> = (props: IDieSeriesProps) => {
	const output: JSX.Element[] = [];

	for (let i = 0; i < props.dice.quantity; i++) {
		output.push(<Die dieType={props.dice.dieId} key={`${DieType[props.dice.dieId]}${i}`} />);
	}

	return <>{output}</>;
};
