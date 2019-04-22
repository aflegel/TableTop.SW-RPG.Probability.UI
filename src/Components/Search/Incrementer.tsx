import React, { FunctionComponent } from "react";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { Die } from "../Dice/Die";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieType } from "../../Models/DieType";

type DieIncrementertProps = IStatisticsState & IDieIncrementer;

export interface IDieIncrementer {
	dieType: DieType;
	addDieCallback: Function;
	removeDieCallback: Function;
}

/**
 * Renders buttons, icon, and quantity to increment the search
 */
export const DieIncrementer: FunctionComponent<DieIncrementertProps> = (props: DieIncrementertProps) => {
	const DieCount = () => {
		let count = 0;
		if (props.searchDice) {
			const test = props.searchDice.filter(f => f.dieId == props.dieType);

			if (test && test[0]) {
				count = test[0].quantity;
			}
		}
		return count;
	};

	return (
		<>
			<IconButton
				color="secondary"
				aria-label={`Add one ${DieType[props.dieType]}`}
				onClick={() => { props.addDieCallback(props.dieType) }}>
				<AddIcon />
			</IconButton>
			<h5>
				<Die dieType={props.dieType} />
			</h5>
			<h5>{DieCount()}</h5>
			<IconButton
				color="secondary"
				aria-label={`Remove one ${DieType[props.dieType]}`}
				onClick={() => { props.removeDieCallback(props.dieType) }}>
				<RemoveIcon />
			</IconButton>
		</>
	);
};
