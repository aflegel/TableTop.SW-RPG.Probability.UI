import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export const NavMenu: FunctionComponent = () => {
	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" color="inherit" className={""}>
						<Link className="brand-logo" to={"/"}>
							Visualizer
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};
