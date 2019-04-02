import React, { FunctionComponent } from "react";
import { Die } from "../Dice/Die";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieType } from "../../Models/DieType";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

// At runtime, Redux will merge together...
type DieIncrementertProps = IStatisticsState & IDieIncrementer;

export interface IDieIncrementer {
	dieType: DieType;
	addDieCallback: Function;
	removeDieCallback: Function;
}

export const DieIncrementer: FunctionComponent<DieIncrementertProps> = (props: DieIncrementertProps) => {
	/**
	 * Renders the current search icons as well as a search builder
	 */

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
		<div className="row">
			<div className="col s4">
				<IconButton
					color="secondary"
					className={""}
					aria-label="Add an alarm"
					onClick={() => {
						props.addDieCallback(props.dieType);
					}}
				>
					<Icon>alarm</Icon>
				</IconButton>
			</div>
			<div className="col s4 center-align">
				<h5 className="">
					<Die dieType={props.dieType} />x{DieCount()}
				</h5>
			</div>
			<div className="col s4">
				<button
					className="btn light-green darken-3"
					onClick={() => {
						props.removeDieCallback(props.dieType);
					}}
				>
					-
				</button>
			</div>
		</div>
	);
};
