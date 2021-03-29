import React, { ReactElement } from "react";
import { DieSymbol } from "../../Models";

/**
 * Returns an icon element with the appropriate css classes
 */
export const Symbol = (props: { dieSymbol: DieSymbol }): ReactElement => <i className={`ffi ffi-swrpg-${props.dieSymbol.toLowerCase()}`} />;
