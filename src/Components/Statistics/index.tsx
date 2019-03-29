import React, { FunctionComponent, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Graph } from "../Graph";

import { Search } from "../Search";
import { StatisticsResultList } from "./ResultList";
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
