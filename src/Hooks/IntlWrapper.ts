import { createContext } from "react";
import { enUs } from "../Content/en-us";
import { mi } from "../Content/mi";

export interface IntlWrapper {
	current: { locale: string; messages: Record<string, string> };
	update: (locale: Locales) => void;
}

export type Locales = "mi" | "en-us" | "jp";

export const fetchMessages = (locale: Locales) => {
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
