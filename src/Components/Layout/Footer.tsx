import React, { FunctionComponent } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export const Footer: FunctionComponent = () =>
	<AppBar position="static" color="default">
		<Toolbar>
			<Typography variant="caption" color="inherit">
				&copy; 2019 BoutinFlegel
          </Typography>
		</Toolbar>
	</AppBar>;
