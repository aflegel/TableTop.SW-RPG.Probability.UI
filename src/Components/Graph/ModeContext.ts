import React from "react";
import { DieSymbol } from "../../Models";

export interface ModeProps {
	mode: DieSymbol;
}

export interface ExtendedModeProps {
	negativeMode: DieSymbol;
	alternateMode: DieSymbol;
}

const emptyMode: ExtendedModeProps & ModeProps = {
	mode: "Success",
	negativeMode: "Failure",
	alternateMode: "Advantage"
}

export const GetExtendedModes = (mode: DieSymbol): ExtendedModeProps & ModeProps => {
	switch (mode) {
		case "Success":
			return { mode, negativeMode: "Failure", alternateMode: "Advantage" };
		case "Advantage":
			return { mode, negativeMode: "Threat", alternateMode: "Success" };
		default:
			return { mode, negativeMode: "Blank", alternateMode: "Blank" };
	}
};

export const ModeContext = React.createContext(emptyMode);
