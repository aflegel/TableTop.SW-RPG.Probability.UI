import React, { ReactElement, ReactNode } from "react";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";
import { CssBaseline } from "@material-ui/core";

interface ChildrenProps {
	children?: ReactNode;
}

export const Layout = (props: ChildrenProps): ReactElement =>
	<div className="light-green darken-2">
		<CssBaseline />
		<NavMenu />
		<div className="container">{props.children}</div>
		<Footer />
	</div>;
