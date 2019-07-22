import React from "react";
import { storiesOf } from "@storybook/react";
import { DieIncrementer } from "../../src/Components/Search/Incrementer";
import { Search } from "../../src/Components/Search";
import { InitialState } from "../../src/Hooks/SearchStatistics";
// import incrementerMD from "../../src/Components/Search/Incrementer.md";
// import searchMD from "../../src/Components/Search/index.md";

const state = { dice: [], ...InitialState };
const nullCallback = () => {};

storiesOf("Search", module)
	.add("Search Incrementer", () => <DieIncrementer {...state} addDieCallback={nullCallback} removeDieCallback={nullCallback} dieType="Proficiency" />, {
	// notes: { markdown: incrementerMD }
	})
	.add("Main Search", () => <Search {...state} searchCallback={nullCallback} />);
