import React, { ReactElement, useContext } from "react";
import { Typography } from "@material-ui/core";
import { ModeContext } from "./ModeContext";
import { IsBlank } from "./Functions";

export const GraphTitle = (): ReactElement => {
	const { mode, negativeMode } = useContext(ModeContext);

	return <Typography gutterBottom variant="h4" component="h4">
		Distribution of {mode} {!IsBlank(negativeMode) ? `and ${negativeMode}` : ""}
	</Typography>;
};
