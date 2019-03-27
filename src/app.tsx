import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { SessionProvider } from "./framework/SessionContext";
import { Layout } from "./components/layout/Layout";
import { About } from "./components/About";
import { Statistics } from "./components/Statistics/Statistics";

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
