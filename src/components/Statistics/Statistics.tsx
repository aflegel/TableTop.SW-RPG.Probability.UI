import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Graph } from "../graph/Graph";

import { Search } from "../Search/Search";
import { StatisticsResultList } from "./StatisticsResultList";
import { PoolData } from "../Dice/PoolData";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieSymbol } from "../../Models/DieSymbol";

type StatisticsProps = IStatisticsState &
	// typeof DiceService.actionCreators &
	RouteComponentProps<{ positivePoolId?: string; negativePoolId?: string }>;

export const Statistics: FunctionComponent<StatisticsProps> = (props: StatisticsProps) => {
	const componentWillMount = () => {
		// This method runs when the component is first added to the page
		//let startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
		// this.props.requestDiceStatistics();
	};

	const componentWillReceiveProps = (nextProps: StatisticsProps) => {
		// This method runs when incoming props (e.g., route params) change
		//let startDateIndex = parseInt(nextProps.match.params.startDateIndex) || 0;

		if (props.poolCombinationContainer.baseDice == null) {
			// this.props.requestDiceStatistics();
			return;
		} else {
			if (nextProps.searchDice == null) return;
			else if (props.searchDice.length != nextProps.searchDice.length) {
			}
			//this.props.requestDiceStatistics();
		}
	};

	return (
		<div>
			<Search {...props} />
			<div className="row row-fill">
				<div className="col s12">
					<ul className="collection with-header">
						<li className="collection-header">
							<PoolData {...props} />
						</li>
						<li className="collection-item">
							<Graph {...props} mode={DieSymbol.Success} />
						</li>
						<li className="collection-item">
							<Graph {...props} mode={DieSymbol.Advantage} />
						</li>
						<li className="collection-item">
							<Graph {...props} mode={DieSymbol.Triumph} />
						</li>
					</ul>
				</div>
			</div>
			<StatisticsResultList {...props} />
		</div>
	);
};
