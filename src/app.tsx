import * as React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { SessionProvider } from "./framework/SessionContext";
import { Layout } from "./components/layout/Layout";
import About from "./components/About";
import DiceStatistics from "./components/Statistics/DiceStatistics";

export const App = () => {
  return (
    <>
      <SessionProvider>
        <HashRouter>
          <Switch>
         	<Route exact path="/" component={DiceStatistics} />
			<Route path="/About" component={About} />
          </Switch>
        </HashRouter>
      </SessionProvider>
    </>
  );
};
