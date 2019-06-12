import React, { FunctionComponent, ReactElement } from "react";
import { DieSymbol } from "../../Models";

export interface ISymbolProps {
	dieSymbol: DieSymbol;
}

/**
 * Returns an icon element with the appropriate css classes
 */
export const Symbol: FunctionComponent<ISymbolProps> = (props: ISymbolProps): ReactElement =>
	<i className={`ffi ffi-swrpg-${DieSymbol[props.dieSymbol].toString().toLowerCase()}`} />;
