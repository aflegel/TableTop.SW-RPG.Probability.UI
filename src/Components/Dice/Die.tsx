import React, { FunctionComponent } from "react";
import { DieType } from "../../Models/DieType";

export interface IDieProps {
	dieType: DieType;
}

export const Die: FunctionComponent<IDieProps> = (props: IDieProps) => {
	/**
	 * Returns an icon element with the appropriate css classes
	 */
	let dieSize = 0;
	switch (props.dieType) {
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

	return <><i className={"die-stroke ffi ffi-d" + dieSize + " ffi ffi-swrpg-" + DieType[props.dieType].toString().toLowerCase() + "-color"} />{props.dieType}</>;
};
