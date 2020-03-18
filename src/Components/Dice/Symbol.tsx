import React, { ReactElement } from "react";
import { DieSymbol } from "../../Models";

interface SymbolProps {
	dieSymbol: DieSymbol;
}

/**
 * Returns an icon element with the appropriate css classes
 */
export const Symbol = (props: SymbolProps): ReactElement =>
	<i className={`ffi ffi-swrpg-${props.dieSymbol.toLowerCase()}`} />;
