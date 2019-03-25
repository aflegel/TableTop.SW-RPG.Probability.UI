

import * as React from "react";
import { DieSymbol, DieType, PoolDice, PoolCombinationState, PoolCombinationStatistic } from "../../services/DiceModels";

// At runtime, Redux will merge together...
type DieProps =
    IDieProps;        // ... state we've requested from the Redux store // ... plus incoming routing parameters

    export interface IDieProps {
		dieType: DieType;
	}

export default class Die extends React.Component<DieProps, {}>  {
 	/**
	 * Returns an icon element with the appropriate css classes
	 */
    public render(){
		var dieSize = 0;
		switch (this.props.dieType) {
			case DieType.Ability:
			case DieType.Difficulty:
				dieSize = 8;
				break;
			case DieType.Boost:
			case DieType.Setback:
				dieSize = 6;
				break;
			case DieType.Challenge:
			case DieType.Proficiency:
			case DieType.Force:
				dieSize = 12;
				break;
		}

		return <i className={"die-stroke ffi ffi-d" + dieSize + " ffi ffi-swrpg-" + DieType[this.props.dieType].toString().toLowerCase() + "-color"}></i>;
    }
}
