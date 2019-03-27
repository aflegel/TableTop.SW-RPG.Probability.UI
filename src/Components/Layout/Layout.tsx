import React, { FunctionComponent } from "react";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";

export const Layout: FunctionComponent = (props: any) => {
	return (
		<div className="light-green darken-2">
			<NavMenu />
			<div className="container">{props.children}</div>
			<Footer />
		</div>
	);
};
