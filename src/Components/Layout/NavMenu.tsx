import React, { FunctionComponent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export const NavMenu: FunctionComponent = () =>
	<AppBar position="static">
		<Toolbar>
			<Typography variant="h6" color="inherit" className={""}>
				<Button color="inherit">
					Visualizer
						</Button>
			</Typography>
		</Toolbar>
	</AppBar>;

