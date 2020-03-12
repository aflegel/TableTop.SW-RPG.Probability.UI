import React, { ReactElement } from "react";
import { DieType } from "../../Models";
import { createStyles, makeStyles } from "@material-ui/core";

interface DieProps {
	dieType: DieType;
	ariaLabel?: string;
}

const useStyles = makeStyles(() =>
	createStyles({
		dieStroke: {
			WebkitTextStrokeWidth: "1px",
			WebkitTextStrokeColor: "black"
		}
	}),
);

/**
 * Returns an icon element with the appropriate css classes
 */
export const Die = (props: DieProps): ReactElement => {

	const classes = useStyles();

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

	return <i aria-label={props.ariaLabel} className={`${classes.dieStroke} ffi ffi-d${dieSize()} ffi-swrpg-${props.dieType.toLowerCase()}-color`} />;
};
