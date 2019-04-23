import React, { FunctionComponent } from "react";
import { DieType } from "../../Models/DieType";

export interface IDieProps {
	dieType: DieType;
}

/**
 * Returns an icon element with the appropriate css classes
 */
export const Die: FunctionComponent<IDieProps> = (props: IDieProps) => {
	const dieSize = () => {
		switch (props.dieType) {
			case DieType.Ability:
			case DieType.Difficulty:
				return 8;
			case DieType.Boost:
			case DieType.Setback:
				return 6;
			case DieType.Challenge:
			case DieType.Proficiency:
			case DieType.Force:
				return 12;
		}
	};

	return <i className={`die-stroke ffi ffi-d${dieSize()} ffi-swrpg-${DieType[props.dieType].toString().toLowerCase()}-color`} />;
};
