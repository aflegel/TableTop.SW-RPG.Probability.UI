import React from "react";
import { storiesOf } from "@storybook/react";
import { DieSymbol } from "../../src/Models";
import { GraphDetails } from "../../src/Components/Graph/Details";
import { GraphBreakdown } from "../../src/Components/Graph/Breakdown";
import { GraphResultList } from "../../src/Components/Graph/ResultList";
import { GraphLine } from "../../src/Components/Graph/Line";
import { GraphAdvanced } from "../../src/Components/Graph/Advanced";

const sharedProps = {
	mode: DieSymbol.Success,
	negativeMode: DieSymbol.Failure,
	alternateMode: DieSymbol.Advantage,
	totalFrequency: 100,
	filteredSet: [
		{
			symbol: DieSymbol.Success,
			quantity: -2,
			frequency: 5,
			alternateTotal: 1
		},
		{
			symbol: DieSymbol.Success,
			quantity: -1,
			frequency: 15,
			alternateTotal: 0.5
		},
		{
			symbol: DieSymbol.Success,
			quantity: 0,
			frequency: 30,
			alternateTotal: 0
		},
		{
			symbol: DieSymbol.Success,
			quantity: 1,
			frequency: 40,
			alternateTotal: -0.5
		},
		{
			symbol: DieSymbol.Success,
			quantity: 2,
			frequency: 10,
			alternateTotal: -1
		}
	]
};

storiesOf("Graph", module)
	.add("Details", () => <GraphDetails {...sharedProps} />)
	.add("Breakdown", () => <GraphBreakdown {...sharedProps} />)
	.add("Result List", () => <GraphResultList {...sharedProps} />)
	.add("Line Graph", () => <GraphLine {...sharedProps} />)
	.add("Advanced", () => <GraphAdvanced {...sharedProps} />);
