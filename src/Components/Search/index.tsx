import React, { FunctionComponent } from "react";
import { DiceCount } from "./DiceCount";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieType } from "../../Models/DieType";
import { useStatistics } from "../../Hooks/SearchStatistics";

export const Search: FunctionComponent<IStatisticsState> = (props: IStatisticsState) => {
	const { getStatisticsAsync } = useStatistics();

	/**
	 * Renders the current search icons as well as a search builder
	 */
	return (
		<div className="row row-fill">
			<div className="col s12">
				<div className="card">
					<div className="card-content">
						<div className="row">
							<div className="col l4 m6 s12">
								<DiceCount {...props} dieType={DieType.Proficiency} />
								<DiceCount {...props} dieType={DieType.Challenge} />
							</div>
							<div className="col l4 m6 s12">
								<DiceCount {...props} dieType={DieType.Ability} />
								<DiceCount {...props} dieType={DieType.Difficulty} />
							</div>
							<div className="col l4 m6 s12">
								<DiceCount {...props} dieType={DieType.Boost} />
								<DiceCount {...props} dieType={DieType.Setback} />
							</div>
						</div>

						<span>
							<button
								onClick={() => {
									getStatisticsAsync();
								}}
								className="btn btn-primary"
							>
								Search
							</button>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
