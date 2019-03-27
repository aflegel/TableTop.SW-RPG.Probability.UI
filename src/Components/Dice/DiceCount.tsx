import React, { FunctionComponent } from "react";
import { Die } from "./Die";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieType } from "../../Models/DieType";
import { PoolDice } from "../../Models/PoolDice";

// At runtime, Redux will merge together...
type DiceCountProps = IStatisticsState & IDiceCount;

export interface IDiceCount {
	dieType: DieType;
}

export const DiceCount: FunctionComponent<DiceCountProps> = (props: DiceCountProps) => {
	/**
	 * Renders the current search icons as well as a search builder
	 */

	const DeleteDie = (dieType: DieType) => {
		// this.props.removeSearchDie({ dieId: dieType, quantity: 1 });
	};

	const AddDie = (dieType: DieType) => {
		const poolDie: PoolDice = { dieId: dieType, quantity: 1 };

		// this.props.addSearchDie(poolDie);
	};

	let count = 0;
	const test = props.searchDice.filter(f => f.dieId == props.dieType);

	if (test.length > 0) {
		count = test[0].quantity;
	}

	return (
		<div className="row">
			<div className="col s4">
				<button
					className="btn light-green darken-3"
					onClick={() => {
						AddDie(props.dieType);
					}}
				>
					+
				</button>
			</div>
			<div className="col s4 center-align">
				<h5 className="">
					<Die {...props} /> x{count}
				</h5>
			</div>
			<div className="col s4">
				<button
					className="btn light-green darken-3"
					onClick={() => {
						DeleteDie(props.dieType);
					}}
				>
					-
				</button>
			</div>
		</div>
	);
};
