import * as React from "react";
import { DieSymbol } from "../../Models/PoolContainer";

// At runtime, Redux will merge together...
type SymbolProps = ISymbolProps; // ... state we've requested from the Redux store // ... plus incoming routing parameters

export interface ISymbolProps {
	dieSymbol: DieSymbol;
}

export default class Symbol extends React.Component<SymbolProps, {}> {
	/**
	 * Returns an icon element with the appropriate css classes
	 */
	public render() {
		return <i className={"ffi ffi-swrpg-" + DieSymbol[this.props.dieSymbol].toString().toLowerCase()} />;
	}
}
