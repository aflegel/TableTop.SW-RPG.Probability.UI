import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import Graph from "../graph/Graph";

import Search from "../Search/Search";
import StatisticsResultList from "./StatisticsResultList";
import PoolData from "../Dice/PoolData";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieSymbol } from "../../Models/DieSymbol";

// At runtime, Redux will merge together...
type StatisticsProps = IStatisticsState & // ... state we've requested from the Redux store
	// typeof DiceService.actionCreators & // ... plus action creators we've requested
	RouteComponentProps<{ positivePoolId?: string; negativePoolId?: string }>; // ... plus incoming routing parameters

export default class Statistics extends React.Component<StatisticsProps, {}> {
	componentWillMount() {
		// This method runs when the component is first added to the page
		//let startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
		// this.props.requestDiceStatistics();
	}

	componentWillReceiveProps(nextProps: StatisticsProps) {
		// This method runs when incoming props (e.g., route params) change
		//let startDateIndex = parseInt(nextProps.match.params.startDateIndex) || 0;

		if (this.props.poolCombinationContainer.baseDice == null) {
			// this.props.requestDiceStatistics();
			return;
		} else {
			if (nextProps.searchDice == null) return;
			else if (this.props.searchDice.length != nextProps.searchDice.length) {
			}
			//this.props.requestDiceStatistics();
		}
	}

	public render() {
		return (
			<div>
				<Search {...this.props} />
				<div className="row row-fill">
					<div className="col s12">
						<ul className="collection with-header">
							<li className="collection-header">
								<PoolData {...this.props} />
							</li>
							<li className="collection-item">
								<Graph {...this.props} mode={DieSymbol.Success} />
							</li>
							<li className="collection-item">
								<Graph {...this.props} mode={DieSymbol.Advantage} />
							</li>
							<li className="collection-item">
								<Graph {...this.props} mode={DieSymbol.Triumph} />
							</li>
						</ul>
					</div>
				</div>
				<StatisticsResultList {...this.props} />
			</div>
		);
	}
}
