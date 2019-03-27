import React, { FunctionComponent } from "react";
import { DieSymbol } from "../../Models/DieSymbol";

export interface ISymbolProps {
	dieSymbol: DieSymbol;
}

export const Symbol: FunctionComponent<ISymbolProps> = (props: ISymbolProps) => {
	/**
	 * Returns an icon element with the appropriate css classes
	 */
	return <i className={"ffi ffi-swrpg-" + DieSymbol[props.dieSymbol].toString().toLowerCase()} />;
};
