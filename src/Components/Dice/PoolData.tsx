import React, { FunctionComponent } from "react";
import { Dice } from "./Dice";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";

/**
 * Renders the current search icons as well as a search builder
 */
export const PoolData: FunctionComponent<IStatisticsState> = (props: IStatisticsState) => {
	const GetDice = () => {
		if (props.poolContainer && props.poolContainer.baseDice) {
			return <Dice dice={props.poolContainer.baseDice} />;
		} else {
			return <></>;
		}
	};

	return (
		<div className="row row-fill">
			<div className="col s12">
				<h2>Probability Breakdown</h2>
				<h5>{GetDice()}</h5>
			</div>
		</div>
	);
};
