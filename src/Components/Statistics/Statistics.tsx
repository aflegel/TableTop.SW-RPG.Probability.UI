import React, { FunctionComponent, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Graph } from "../Graph/Graph";

import { Search } from "../Search/Search";
import { StatisticsResultList } from "./StatisticsResultList";
import { PoolData } from "../Dice/PoolData";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieSymbol } from "../../Models/DieSymbol";
import { useStatistics } from "../../Hooks/SearchStatistics";

type StatisticsProps = IStatisticsState &
	// typeof DiceService.actionCreators &
	RouteComponentProps<{ positivePoolId?: string; negativePoolId?: string }>;

export const Statistics: FunctionComponent<StatisticsProps> = (props: StatisticsProps) => {
	const { state, getStatisticsAsync } = useStatistics();

	useEffect(() => {
		getStatisticsAsync();
	}, []);

	const componentWillReceiveProps = (nextProps: StatisticsProps) => {
		// This method runs when incoming props (e.g., route params) change
		//let startDateIndex = parseInt(nextProps.match.params.startDateIndex) || 0;

		if (props.poolContainer.baseDice == null) {
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
			<Search {...state} />
			<div className="row row-fill">
				<div className="col s12">
					<ul className="collection with-header">
						<li className="collection-header">
							<PoolData {...state} />
						</li>
						<li className="collection-item">
							<Graph {...state} mode={DieSymbol.Success} />
						</li>
						<li className="collection-item">
							<Graph {...state} mode={DieSymbol.Advantage} />
						</li>
						<li className="collection-item">
							<Graph {...state} mode={DieSymbol.Triumph} />
						</li>
					</ul>
				</div>
			</div>
			<StatisticsResultList {...state} />
		</div>
	);
};
