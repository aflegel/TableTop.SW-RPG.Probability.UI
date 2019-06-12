import React, { FunctionComponent, ReactElement } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

export const NavMenu: FunctionComponent = (): ReactElement =>
	<AppBar position="static">
		<Toolbar>
			<Typography variant="h6" color="inherit">
				<Button color="inherit">
					Visualizer
				</Button>
			</Typography>
		</Toolbar>
	</AppBar>;
