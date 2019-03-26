import * as React from "react";
import Die from "./Die";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieType } from "../../Models/DieType";
import { PoolDice } from "../../Models/PoolDice";

// At runtime, Redux will merge together...
type DiceCountProps = IStatisticsState &
	IDiceCount;

export interface IDiceCount {
	dieType: DieType;
}

export default class DiceCount extends React.Component<DiceCountProps, {}> {
	/**
	 * Renders the current search icons as well as a search builder
	 */
	public render() {
		let count = 0;
		const test = this.props.searchDice.filter(f => f.dieId == this.props.dieType);

		if (test.length > 0) {
			count = test[0].quantity;
		}

		return (
			<div className="row">
				<div className="col s4">
					<button
						className="btn light-green darken-3"
						onClick={() => {
							this.AddDie(this.props.dieType);
						}}
					>
						+
					</button>
				</div>
				<div className="col s4 center-align">
					<h5 className="">
						<Die {...this.props} /> x{count}
					</h5>
				</div>
				<div className="col s4">
					<button
						className="btn light-green darken-3"
						onClick={() => {
							this.DeleteDie(this.props.dieType);
						}}
					>
						-
					</button>
				</div>
			</div>
		);
	}

	private DeleteDie(dieType: DieType) {
		// this.props.removeSearchDie({ dieId: dieType, quantity: 1 });
	}

	private AddDie(dieType: DieType) {
		const poolDie: PoolDice = { dieId: dieType, quantity: 1 };

		// this.props.addSearchDie(poolDie);
	}
}
