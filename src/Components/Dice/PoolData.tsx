import React, { FunctionComponent } from "react";
import { Dice } from "./Dice";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";

export const PoolData: FunctionComponent<IStatisticsState> = (props: IStatisticsState) => {
	/**
	 * Renders the current search icons as well as a search builder
	 */
	if (props.poolCombinationContainer && props.poolCombinationContainer.baseDice) {
		return (
			<div className="row row-fill">
				<div className="col s12">
					<h2>Probability Breakdown</h2>

					<h5>
						<Dice dice={props.poolCombinationContainer.baseDice} />
					</h5>
				</div>
			</div>
		);
	} else {
		return <></>;
	}
};
