import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { SessionProvider } from "./Framework/SessionContext";
import { Layout } from "./Components/Layout/Layout";
import { About } from "./Components/About";
import { Statistics } from "./Components/Statistics";

import "./Styles/App.scss";
import "sw-rpg-icons/css/sw-rpg-icons.scss";
import "sw-rpg-icons/css/sw-rpg-colors.scss";

export const App = () => {
	return (
		<SessionProvider>
			<HashRouter>
				<Switch>
					<Layout>
						<Route exact path="/" component={Statistics} />
						<Route path="/About" component={About} />
					</Layout>
				</Switch>
			</HashRouter>
		</SessionProvider>
	);
};
