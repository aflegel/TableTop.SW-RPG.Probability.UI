import * as React from "react";
import DiceCount from "../Dice/DiceCount";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieType } from "../../Models/DieType";

// At runtime, Redux will merge together...
type SearchProps = IStatisticsState & // ... state we've requested from the Redux store
	// typeof DiceService.actionCreators &
	ISearchProps; // ... state we've requested from the Redux store // ... plus incoming routing parameters

export interface ISearchProps {}

export default class Search extends React.Component<SearchProps, {}> {
	/**
	 * Renders the current search icons as well as a search builder
	 */
	public render() {
		return (
			<div className="row row-fill">
				<div className="col s12">
					<div className="card">
						<div className="card-content">
							<div className="row">
								<div className="col l4 m6 s12">
									<DiceCount {...this.props} dieType={DieType.Proficiency} />
									<DiceCount {...this.props} dieType={DieType.Challenge} />
								</div>
								<div className="col l4 m6 s12">
									<DiceCount {...this.props} dieType={DieType.Ability} />
									<DiceCount {...this.props} dieType={DieType.Difficulty} />
								</div>
								<div className="col l4 m6 s12">
									<DiceCount {...this.props} dieType={DieType.Boost} />
									<DiceCount {...this.props} dieType={DieType.Setback} />
								</div>
							</div>

							<span>
								<button
									onClick={() => {
										// this.props.requestDiceStatistics();
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
	}
}
