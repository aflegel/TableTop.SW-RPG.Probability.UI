import * as React from "react";
import { DieType, PoolCombinationState } from "../../Models/PoolContainer";
import * as DiceService from "../../services/DiceService";
import DiceCount from "../Dice/DiceCount";

// At runtime, Redux will merge together...
type SearchProps = PoolCombinationState & // ... state we've requested from the Redux store
	typeof DiceService.actionCreators &
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
										this.props.requestDiceStatistics();
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
