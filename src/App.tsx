import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { SessionProvider } from "./Framework/SessionContext";
import { Layout } from "./Components/Layout/Layout";
import { About } from "./Components/About";
import { Statistics } from "./Components/Statistics/Statistics";

export const App = () => {
	return (
		<SessionProvider>
			<HashRouter>
				<Switch>
					<Route exact path="/" component={Statistics} />
					<Route path="/About" component={About} />
				</Switch>
			</HashRouter>
		</SessionProvider>
	);
};
