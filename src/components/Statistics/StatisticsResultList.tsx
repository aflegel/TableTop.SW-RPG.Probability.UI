import * as React from "react";
import { DieSymbol, PoolCombinationState, PoolCombination } from "../../Models/PoolContainer";

// At runtime, Redux will merge together...
type StatisticsResultListProps = PoolCombinationState; // ... state we've requested from the Redux store

export default class StatisticsResultList extends React.Component<StatisticsResultListProps, {}> {
	/**
	 * Renders a table with the raw data used for populating the tables and statistics data
	 */
	public render() {
		if (this.props.poolCombinationContainer) {
			let containers: PoolCombination[] = [];

			if (this.props.poolCombinationContainer.baseline) containers = containers.concat(this.props.poolCombinationContainer.baseline);

			return (
				<div className="row row-fill">
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
										{containers.map(poolCombination =>
											poolCombination.poolCombinationStatistics.map(combination => (
												<tr>
													<td>{DieSymbol[combination.symbol]}</td>
													<td>{combination.quantity}</td>
													<td>{new Intl.NumberFormat("en-Us").format(combination.frequency)}</td>
													<td>{new Intl.NumberFormat("en-Us").format(combination.alternateTotal)}</td>
												</tr>
											))
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return <></>;
		}
	}
}
