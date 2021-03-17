/**
 * Some notes
 *
 * 1. This content should be driven from some connected CMS, but for the sake of simplicity it is included here.
 *
 * 2. Te Reo has no support at the time of writing in Chrome
 */

import { IntlConfig } from "react-intl";

export const mi: Record<string, string> = {
	Title: "TR Visualizer",
	"Dice.Advantage": "Painga",
	"Dice.Boost": "Whakarei",
	"Dice.Despair": "Hepohepo",
	"Dice.Failure": "Rahua",
	"Dice.Setback": "Mahinga Whakamuri",
	"Dice.Success": "Angitu",
	"Dice.Threat": "Fakamanamana",
	"Dice.Triumph": "Wikitoria",
};

export const miConfig: IntlConfig = {
	locale: "mi",
	formats: {},
	messages: mi,
	defaultLocale: "en-us",
	defaultFormats: {},
	onError: () => {
		const test = "";
	},
};
