import React, { FunctionComponent } from "react";
import { PoolCombination } from "../../Models/PoolCombination";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieSymbol } from "../../Models/DieSymbol";
import { Format } from "../Graph/Formatter";

/**
 * Renders a table with the raw data used for populating the tables and statistics data
 */
export const StatisticsResultList: FunctionComponent<IStatisticsState> = (props: IStatisticsState) => {
	if (props.poolCombination) {
		let containers: PoolCombination[] = [];

		if (props.poolCombination) containers.push(props.poolCombination);

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
										poolCombination.poolStatistics.map(combination => (
											<tr>
												<td>{DieSymbol[combination.symbol]}</td>
												<td>{combination.quantity}</td>
												<td>{Format(combination.frequency, false)}</td>
												<td>{Format(combination.alternateTotal, false)}</td>
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
};
