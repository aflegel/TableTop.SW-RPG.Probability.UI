import React, { ReactElement } from "react";
import { Layout } from "./Components/Layout";
import { Statistics } from "./Components/Statistics";

import "sw-rpg-icons/css/sw-rpg-icons.scss";
import "sw-rpg-icons/css/sw-rpg-colors.scss";

export const App = (): ReactElement => (
	<Layout>
		<Statistics />
	</Layout>
);
