import React, { ReactElement } from "react";
import { IconButton, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { Die } from "../Dice/Die";
import { DieType } from "../../Models";
import { SearchState } from ".";

type DieIncrementertProps = SearchState & DieIncrementer;

export interface DieIncrementer {
	dieType: DieType;
	addDieCallback: Function;
	removeDieCallback: Function;
}

/**
 * Renders buttons, icon, and quantity to increment the search
 */
export const DieIncrementer = (props: DieIncrementertProps): ReactElement => {
	const die = props.dice ? props.dice.find(f => f.dieType === props.dieType) : undefined;
	const count = die ? die.quantity : 0;

	return <>
		<IconButton
			color="secondary"
			aria-label={`Add one ${props.dieType}`}
			onClick={(): void => { props.addDieCallback(props.dieType); }}>
			<AddIcon />
		</IconButton>
		<Typography variant="h5">
			<Die dieType={props.dieType} ariaLabel={props.dieType} />
		</Typography>
		<Typography variant="h4">{count}</Typography>
		<IconButton
			color="secondary"
			aria-label={`Remove one ${props.dieType}`}
			onClick={(): void => { props.removeDieCallback(props.dieType); }}>
			<RemoveIcon />
		</IconButton>
	</>;
};
