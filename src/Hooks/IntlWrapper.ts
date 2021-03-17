import { createContext } from "react";
import { IntlConfig } from "react-intl";
import { enConfig } from "../Content/en-us";
import { miConfig } from "../Content/mi";

export interface IntlWrapper {
	current: IntlConfig;
	update: (locale: Locales) => void;
}

export type Locales = "mi" | "en-us" | "jp";

export const fetchMessages = (locale: Locales) => {
	switch (locale) {
		case "en-us":
			return enConfig;
		case "mi":
			return miConfig;
		case "jp":
			break;
	}
};

export const IntlWrapperContext = createContext<IntlWrapper>({
	current: miConfig,
	update: fetchMessages,
});
