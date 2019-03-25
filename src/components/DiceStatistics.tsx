import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { ApplicationState } from "../services";
import * as DiceStatistics from "../services/DiceService";
import DiceUtility from "../framework/DiceUtility";
import Graph from "./Graph";

import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import { DieType, DieSymbol, PoolCombinationState, PoolCombinationStatistic, PoolDice, PoolCombination } from "../services/DiceModels";


// At runtime, Redux will merge together...
type DiceStatisticsProps =
	PoolCombinationState        // ... state we've requested from the Redux store
	& typeof DiceStatistics.actionCreators     // ... plus action creators we've requested
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
							{this.RenderGraphAndData(DieSymbol.Success)}
						</li>
						<li className="collection-item">
							{this.RenderGraphAndData(DieSymbol.Advantage)}
						</li>
						<li className="collection-item">
							{this.RenderGraphAndData(DieSymbol.Triumph)}
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
	private RenderSearch() {
		return <div className="row row-fill">
			<div className="col s12">
				<div className="card">
					<div className="card-content">
						<div className="row">
							<div className="col l4 m6 s12">
								{this.RenderDieCount(DieType.Proficiency)}
								{this.RenderDieCount(DieType.Challenge)}
							</div>
							<div className="col l4 m6 s12">
								{this.RenderDieCount(DieType.Ability)}
								{this.RenderDieCount(DieType.Difficulty)}
							</div>
							<div className="col l4 m6 s12">
								{this.RenderDieCount(DieType.Boost)}
								{this.RenderDieCount(DieType.Setback)}
							</div>
						</div>

						<span>
							<button onClick={() => { this.props.requestDiceStatistics(); }} className="btn btn-primary">Search</button>
						</span>
					</div>
				</div>
			</div>
		</div>;
	}

	/**
	 * Renders the current search icons as well as a search builder
	 */
	private RenderPoolData() {
		if (this.props.poolCombinationContainer.baseDice != null)
			return <div className="row row-fill">
				<div className="col s12">
					<h2>Probability Breakdown</h2>

					<h5>{DiceUtility.RenderDice(this.props.poolCombinationContainer.baseDice)}</h5>
				</div>
			</div>;
	}

	private RenderDieCount(dieType: DieType) {
		var count = 0;
		var test = this.props.searchDice.filter(f => f.dieId == dieType);

		if (test.length > 0) {
			count = test[0].quantity
		}

		return <div className="row">
			<div className="col s4">
				<button className="btn light-green darken-3" onClick={() => { this.AddDie(dieType) }}>+</button>
			</div>
			<div className="col s4 center-align">
				<h5 className="">{DiceUtility.RenderDie(dieType)} x{count}</h5>
			</div>
			<div className="col s4">
				<button className="btn light-green darken-3" onClick={() => { this.DeleteDie(dieType) }}>-</button>
			</div>
		</div>;
	}


	private DeleteDie(dieType: DieType) {
		this.props.removeSearchDie({ dieId: dieType, quantity: 1 });
	}

	private AddDie(dieType: DieType) {
		var poolDie: PoolDice = { dieId: dieType, quantity: 1 };

		this.props.addSearchDie(poolDie);
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
