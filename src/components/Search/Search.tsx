import * as React from "react";
import { DieSymbol, DieType, PoolDice, PoolCombinationState, PoolCombinationStatistic } from "../../services/DiceModels";
import * as DiceService from "../../services/DiceService";
import DiceUtilty from "../Dice/DiceSymbol";
import Die from "../Dice/Die";
import DiceCount from "../Dice/DiceCount";

// At runtime, Redux will merge together...
type SearchProps =
	PoolCombinationState        // ... state we've requested from the Redux store
	& typeof DiceService.actionCreators
    & ISearchProps;        // ... state we've requested from the Redux store // ... plus incoming routing parameters

    export interface ISearchProps {
	}

export default class Search extends React.Component<SearchProps, {}>  {
 	/**
	 * Renders the current search icons as well as a search builder
	 */
    public render(){
		return <div className="row row-fill">
			<div className="col s12">
				<div className="card">
					<div className="card-content">
						<div className="row">
							<div className="col l4 m6 s12">
								<DiceCount {...this.props} dieType={DieType.Proficiency}></DiceCount>
								<DiceCount {...this.props} dieType={DieType.Challenge}></DiceCount>
							</div>
							<div className="col l4 m6 s12">
								<DiceCount {...this.props} dieType={DieType.Ability}></DiceCount>
								<DiceCount {...this.props} dieType={DieType.Difficulty}></DiceCount>
							</div>
							<div className="col l4 m6 s12">
								<DiceCount {...this.props} dieType={DieType.Boost}></DiceCount>
								<DiceCount {...this.props} dieType={DieType.Setback}></DiceCount>
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
}
