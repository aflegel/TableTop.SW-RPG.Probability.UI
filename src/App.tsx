import React, { ReactElement } from "react";
import { Layout } from "./Components/Layout";
import { Statistics } from "./Components/Statistics";
import { IntlContainer } from "./Hooks/IntlWrapper";

import "sw-rpg-icons/css/sw-rpg-icons.scss";
import "sw-rpg-icons/css/sw-rpg-colors.scss";

export const App = (): ReactElement => {
	return (
		<IntlContainer>
			<Layout>
				<Statistics />
			</Layout>
		</IntlContainer>
	);
};
