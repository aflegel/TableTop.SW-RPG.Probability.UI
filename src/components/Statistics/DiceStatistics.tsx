import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { ApplicationState } from "../../services";
import * as DiceService from "../../services/DiceService";
import DiceUtility from "../Dice/DiceSymbol";
import Graph from "../graph/Graph";

import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import { DieType, DieSymbol, PoolCombinationState, PoolCombinationStatistic, PoolDice, PoolCombination } from "../../services/DiceModels";
import Dice from "../Dice/Dice";


// At runtime, Redux will merge together...
type DiceStatisticsProps =
	PoolCombinationState        // ... state we've requested from the Redux store
	& typeof DiceService.actionCreators     // ... plus action creators we've requested
	& RouteComponentProps<{ positivePoolId?: number, negativePoolId?: number }>; // ... plus incoming routing parameters

class FetchDiceStatistics extends React.Component<DiceStatisticsProps, {}> {
	componentWillMount() {
		// This method runs when the component is first added to the page
		//let startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
		this.props.requestDiceStatistics();
	}

	componentWillReceiveProps(nextProps: DiceStatisticsProps) {
		// This method runs when incoming props (e.g., route params) change
		//let startDateIndex = parseInt(nextProps.match.params.startDateIndex) || 0;

		if (this.props.poolCombinationContainer.baseDice == null) {
			this.props.requestDiceStatistics();
			return;
		} else {
			if (nextProps.searchDice == null)
				return;
			else if (this.props.searchDice.length != nextProps.searchDice.length) {

			}
			//this.props.requestDiceStatistics();
		}
	}

	public render() {
		return <div>
			{this.RenderSearch()}
			<div className="row row-fill">
				<div className="col s12">
					<ul className="collection with-header">
						<li className="collection-header">
							{this.RenderPoolData()}
						</li>
						<li className="collection-item">
							<Graph {...this.props} mode={DieSymbol.Success}></Graph>
						</li>
						<li className="collection-item">
							<Graph {...this.props} mode={DieSymbol.Advantage}></Graph>
						</li>
						<li className="collection-item">
							<Graph {...this.props} mode={DieSymbol.Triumph}></Graph>
						</li>
					</ul>
				</div>
			</div>

			{this.RenderResults()}

		</div>;
	}



	/**
	 * Renders the current search icons as well as a search builder
	 */
	private RenderPoolData() {
		if (this.props.poolCombinationContainer.baseDice){


			return <div className="row row-fill">
				<div className="col s12">
					<h2>Probability Breakdown</h2>

					<h5>
						<Dice dice={this.props.poolCombinationContainer.baseDice}></Dice>
					</h5>
				</div>
			</div>;
		}
	}

	/**
	 * Renders a table with the raw data used for populating the tables and statistics data
	 */
	private RenderResults() {
		if (this.props.poolCombinationContainer != null) {

			var containers: PoolCombination[] = [];

			if (this.props.poolCombinationContainer.baseline != null)
				containers = containers.concat(this.props.poolCombinationContainer.baseline);

			return <div className="row row-fill">
				<div className="col s12">
					<div className="card">
						<div className="card-content">
							<table className="table">
								<thead>
									<tr>
										<th>Symbol</th>
										<th>Quantity</th>
										<th>Frequency</th>
										<th>Alternate Total</th>
									</tr>
								</thead>
								<tbody>
									{containers.map(poolCombination => poolCombination.poolCombinationStatistics.map(combination =>
										<tr>
											<td>{DieSymbol[combination.symbol]}</td>
											<td>{combination.quantity}</td>
											<td>{new Intl.NumberFormat("en-Us").format(combination.frequency)}</td>
											<td>{new Intl.NumberFormat("en-Us").format(combination.alternateTotal)}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>;
		}
		else {

		}
	}

}

export default connect(
	(state: ApplicationState) => state.diceStatistics, // Selects which state properties are merged into the component's props
	DiceStatistics.actionCreators					  // Selects which action creators are merged into the component's props
)(FetchDiceStatistics) as typeof FetchDiceStatistics;
