import * as React from "react";
import {DieSymbol, DieType, PoolDice} from "../../services/DiceModels";

// At runtime, Redux will merge together...
type DieSymbolPrintProps =
    IDieSymbolPrintProps;        // ... state we've requested from the Redux store // ... plus incoming routing parameters

    export interface IDieSymbolPrintProps {
		dieSymbol: DieSymbol;
	}


export default class DieSymbolPrint extends React.Component<DieSymbolPrintProps, {}>  {
 	/**
	 * Returns an icon element with the appropriate css classes
	 */
    public render(){
		return <i className={"ffi ffi-swrpg-" + DieSymbol[this.props.dieSymbol].toString().toLowerCase()}></i>;
    }
}
