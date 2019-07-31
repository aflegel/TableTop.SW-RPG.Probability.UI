import React, { ReactElement } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Layout } from "./Components/Layout";
import { About } from "./Components/About";
import { Statistics } from "./Components/Statistics";

import "sw-rpg-icons/css/sw-rpg-icons.scss";
import "sw-rpg-icons/css/sw-rpg-colors.scss";

export const App = (): ReactElement =>
	<HashRouter>
		<Switch>
			<Layout>
				<Route exact path="/" component={Statistics} />
				<Route path="/About" component={About} />
			</Layout>
		</Switch>
	</HashRouter>;

