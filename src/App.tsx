import React, { ReactElement, useState } from "react";
import { Layout } from "./Components/Layout";
import { Statistics } from "./Components/Statistics";
import { IntlWrapperContext, fetchMessages, Locales } from "./Hooks/IntlWrapper";

import "sw-rpg-icons/css/sw-rpg-icons.scss";
import "sw-rpg-icons/css/sw-rpg-colors.scss";
import { IntlProvider } from "react-intl";
import { miConfig } from "./Content/mi";

export const App = (): ReactElement => {
	const [userLocale, setUserLocale] = useState(miConfig);

	const updateContext = (locale: Locales) => {
		const newState = fetchMessages(locale);
		if (newState) setUserLocale(newState);
	};

	return (
		<IntlWrapperContext.Provider value={{ current: userLocale, update: updateContext }}>
			<IntlProvider {...userLocale}>
				<Layout>
					<Statistics />
				</Layout>
			</IntlProvider>
		</IntlWrapperContext.Provider>
	);
};
