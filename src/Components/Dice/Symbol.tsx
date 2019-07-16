import React, { FunctionComponent, ReactElement } from "react";
import { DieSymbol } from "../../Models";

export interface SymbolProps {
	dieSymbol: DieSymbol;
}

/**
 * Returns an icon element with the appropriate css classes
 */
export const Symbol: FunctionComponent<SymbolProps> = (props: SymbolProps): ReactElement =>
	<i className={`ffi ffi-swrpg-${props.dieSymbol.toLowerCase()}`} />;
