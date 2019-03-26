import * as React from "react";
import Dice from "./Dice";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";

// At runtime, Redux will merge together...
type PoolDataProps = IStatisticsState; // ... state we've requested from the Redux store

export default class PoolData extends React.Component<PoolDataProps, {}> {
	/**
	 * Renders the current search icons as well as a search builder
	 */
	public render() {
		if (this.props.poolCombinationContainer.baseDice) {
			return (
				<div className="row row-fill">
					<div className="col s12">
						<h2>Probability Breakdown</h2>

						<h5>
							<Dice dice={this.props.poolCombinationContainer.baseDice} />
						</h5>
					</div>
				</div>
			);
		}
	}
}
