import React, { FunctionComponent, useEffect } from "react";
import { Graph } from "../Graph";
import { Search } from "../Search";
import { StatisticsResultList } from "./ResultList";
import { PoolData } from "../Dice/PoolData";
import { DieSymbol } from "../../Models/DieSymbol";
import { useStatistics } from "../../Hooks/SearchStatistics";

export const Statistics: FunctionComponent = () => {
	const { state, getStatisticsAsync, addSearchDie, removeSearchDie } = useStatistics();

	useEffect(() => {
		getStatisticsAsync();
	}, []);

	return (
		<div>
			<Search {...state} addDieCallback={addSearchDie} removeDieCallback={removeSearchDie} searchCallback={getStatisticsAsync} />
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
