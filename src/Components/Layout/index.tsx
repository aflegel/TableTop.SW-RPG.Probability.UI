import React, { FunctionComponent, ReactElement } from "react";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";
import { CssBaseline } from "@material-ui/core";

export const Layout: FunctionComponent = (props: any): ReactElement =>
	<div className="light-green darken-2">
		<CssBaseline />
		<NavMenu />
		<div className="container">{props.children}</div>
		<Footer />
	</div>;
