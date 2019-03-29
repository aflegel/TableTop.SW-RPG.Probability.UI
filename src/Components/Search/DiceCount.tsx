import React, { FunctionComponent } from "react";
import { Die } from "../Dice/Die";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieType } from "../../Models/DieType";
import { PoolDice } from "../../Models/PoolDice";
import { useStatistics } from "../../Hooks/SearchStatistics";

// At runtime, Redux will merge together...
type DiceCountProps = IStatisticsState & IDiceCount;

export interface IDiceCount {
	dieType: DieType;
}

export const DiceCount: FunctionComponent<DiceCountProps> = (props: DiceCountProps) => {
	/**
	 * Renders the current search icons as well as a search builder
	 */
	const { addSearchDie, removeSearchDie } = useStatistics();

	const DeleteDie = () => {
		removeSearchDie({ dieId: props.dieType, quantity: 1 });
	};

	const AddDie = () => {
		addSearchDie({ dieId: props.dieType, quantity: 1 });
	};

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
				<button
					className="btn light-green darken-3"
					onClick={() => {
						AddDie();
					}}
				>
					+
				</button>
			</div>
			<div className="col s4 center-align">
				<h5 className="">
					<Die {...props} /> x{DieCount()}
				</h5>
			</div>
			<div className="col s4">
				<button
					className="btn light-green darken-3"
					onClick={() => {
						DeleteDie();
					}}
				>
					-
				</button>
			</div>
		</div>
	);
};
