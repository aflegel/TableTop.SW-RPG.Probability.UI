import React from "react";
import { storiesOf } from "@storybook/react";
import { DieType } from "../../src/Models";
import { DieIncrementer } from "../../src/Components/Search/Incrementer";
import { Search } from "../../src/Components/Search";
import someMarkdownText from "../../src/Components/Search/Incrementer.md";

const state = { dice: [] };
const nullCallback = () => {};

storiesOf("Search", module)
	// .addDecorator(storyFn => <div style={{ textAlign: "center" }}>{storyFn()}</div>)
	.add(
		"Search Incrementer",
		() => <DieIncrementer {...state} addDieCallback={nullCallback} removeDieCallback={nullCallback} dieType={DieType.Proficiency} />,
		{ notes: {markdown: someMarkdownText}, info: "incrementer info" }
	)
	.add("Main Search", () => <Search {...state} searchCallback={nullCallback} />);
