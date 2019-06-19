import React, { FunctionComponent, ReactElement } from "react";
import { DieType } from "../../Models";

export interface IDieProps {
	dieType: DieType;
	ariaLabel?: string;
}

/**
 * Returns an icon element with the appropriate css classes
 */
export const Die: FunctionComponent<IDieProps> = (props: IDieProps): ReactElement => {
	const dieSize = (): number => {
		switch (props.dieType) {
			case "Ability":
			case "Difficulty":
				return 8;
			case "Boost":
			case "Setback":
				return 6;
			case "Challenge":
			case "Proficiency":
			case "Force":
				return 12;
		}
	};

	return <i aria-label={props.ariaLabel} className={`die-stroke ffi ffi-d${dieSize()} ffi-swrpg-${props.dieType.toLowerCase()}-color`} />;
};
