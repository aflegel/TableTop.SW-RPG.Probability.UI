import React, { createContext, ReactElement, ReactNode, useState } from "react";
import { IntlProvider } from "react-intl";
import { enUs } from "../Content/en-us";
import { mi } from "../Content/mi";

interface IntlWrapper {
	current: { locale: string; messages: Record<string, string> };
	update: (locale: Locales) => void;
}

export type Locales = "mi" | "en-us" | "jp";

const fetchMessages = (locale: Locales) => {
	switch (locale) {
		case "en-us":
			return enUs;
		case "mi":
			return mi;
		case "jp":
			break;
	}
};

export const IntlWrapperContext = createContext<IntlWrapper>({
	current: { locale: "en-us", messages: enUs },
	update: fetchMessages,
});

interface ChildrenProps {
	children?: ReactNode;
}

export const IntlContainer = (props: ChildrenProps): ReactElement => {
	const [userLocale, setUserLocale] = useState({ locale: "en-us", messages: enUs });

	const updateContext = (locale: Locales) => {
		const newState = fetchMessages(locale);
		if (newState) setUserLocale({ locale: locale, messages: newState });
	};

	return (
		<IntlWrapperContext.Provider value={{ current: userLocale, update: updateContext }}>
			<IntlProvider {...userLocale}>{props.children}</IntlProvider>
		</IntlWrapperContext.Provider>
	);
};