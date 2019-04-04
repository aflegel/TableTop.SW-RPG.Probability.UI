import React, { FunctionComponent } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { Die } from "../Dice/Die";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieType } from "../../Models/DieType";

// At runtime, Redux will merge together...
type DieIncrementertProps = IStatisticsState & IDieIncrementer;

export interface IDieIncrementer {
	dieType: DieType;
	addDieCallback: Function;
	removeDieCallback: Function;
}

/**
 * Renders the current search icons as well as a search builder
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
				className={""}
				aria-label="Add an alarm"
				onClick={() => {
					props.addDieCallback(props.dieType);
				}}
			>
				<AddIcon />
			</IconButton>
			<h5>
				<Die dieType={props.dieType} />
			</h5>
			<h5>{DieCount()}</h5>
			<IconButton
				color="secondary"
				className={""}
				aria-label="Add an alarm"
				onClick={() => {
					props.removeDieCallback(props.dieType);
				}}
			>
				<RemoveIcon />
			</IconButton>
		</>
	);
};
