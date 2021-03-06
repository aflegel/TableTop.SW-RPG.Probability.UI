import React, { ReactElement, useContext } from "react";
import { IconButton, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { Die } from "../Dice/Die";
import { DieType } from "../../Models";
import { DiceContext } from "../Dice/DiceContext";

interface DieIncrementer {
	dieType: DieType;
	addDieCallback: (param: DieType) => void;
	removeDieCallback: (param: DieType) => void;
}

/**
 * Renders buttons, icon, and quantity to increment the search
 */
export const DieIncrementer = (props: DieIncrementer): ReactElement => {
	const dice = useContext(DiceContext);

	const die = dice ? dice.find((f) => f.dieType === props.dieType) : undefined;

	return (
		<>
			<IconButton
				color="secondary"
				aria-label={`Add one ${props.dieType}`}
				onClick={(): void => {
					props.addDieCallback(props.dieType);
				}}
			>
				<AddIcon />
			</IconButton>
			<Typography variant="h5">
				<Die dieType={props.dieType} ariaLabel={props.dieType} />
			</Typography>
			<Typography variant="h4">{die ? die.quantity : 0}</Typography>
			<IconButton
				color="secondary"
				aria-label={`Remove one ${props.dieType}`}
				onClick={(): void => {
					props.removeDieCallback(props.dieType);
				}}
			>
				<RemoveIcon />
			</IconButton>
		</>
	);
};
