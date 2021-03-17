import { IntlConfig } from "react-intl";

export const enUs: Record<string, string> = {
	Title: "En Visualizer",
	"Dice.Advantage": "Advantage",
	"Dice.Boost": "Boost",
	"Dice.Despair": "Despair",
	"Dice.Failure": "Failure",
	"Dice.Setback": "Setback",
	"Dice.Success": "Success",
	"Dice.Threat": "Threat",
	"Dice.Triumph": "Triumph",
};

/**
 * Ideally this will be inferred using the default strategies, but because Te Reo does not have this support we must include the english defaults as well
 */
export const enConfig: IntlConfig = {
	locale: "en-us",
	formats: {},
	messages: enUs,
	defaultLocale: "en-us",
	defaultFormats: {},
	onError: () => {
		const test = "";
	},
};
