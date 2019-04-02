import React, { FunctionComponent, useEffect } from "react";
import { Graph } from "../Graph";
import { Search } from "../Search";
import { StatisticsResultList } from "./ResultList";
import { DieSymbol } from "../../Models/DieSymbol";
import { useStatistics } from "../../Hooks/SearchStatistics";
import { Dice } from "../Dice/Dice";

export const Statistics: FunctionComponent = () => {
	const { state, getStatisticsAsync, addSearchDie, removeSearchDie } = useStatistics();

	const GetDice = () => {
		if (state.poolCombination && state.poolCombination.dice) {
			return <Dice dice={state.poolCombination.dice} />;
		} else {
			return <></>;
		}
	};

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
							<div className="row row-fill">
								<div className="col s12">
									<h2>Probability Breakdown</h2>
									<h5>{GetDice()}</h5>
								</div>
							</div>
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
