import React from "react";
import { storiesOf } from "@storybook/react";
import { GraphDetails } from "../../src/Components/Graph/Details";
import { GraphBreakdown } from "../../src/Components/Graph/Breakdown";
import { GraphStatisticsList } from "../../src/Components/Graph/StatisticsList";
import { GraphLine } from "../../src/Components/Graph/Line";
import { GraphAdvanced } from "../../src/Components/Graph/Advanced";
import { IModeProps, IExtendedModeProps, IDataSetProps } from "../../src/Components/Graph";

const sharedProps: IModeProps & IExtendedModeProps & IDataSetProps = {
	mode: "Success",
	negativeMode: "Failure",
	alternateMode: "Advantage",
	totalFrequency: 100,
	filteredSet: [
		{
			symbol: "Success",
			quantity: -2,
			frequency: 5,
			alternateTotal: 1
		},
		{
			symbol: "Success",
			quantity: -1,
			frequency: 15,
			alternateTotal: 0.5
		},
		{
			symbol: "Success",
			quantity: 0,
			frequency: 30,
			alternateTotal: 0
		},
		{
			symbol: "Success",
			quantity: 1,
			frequency: 40,
			alternateTotal: -0.5
		},
		{
			symbol: "Success",
			quantity: 2,
			frequency: 10,
			alternateTotal: -1
		}
	]
};

storiesOf("Graph", module)
	.add("Details", () => <GraphDetails {...sharedProps} />)
	.add("Breakdown", () => <GraphBreakdown {...sharedProps} />)
	.add("Result List", () => <GraphStatisticsList {...sharedProps} />)
	.add("Line Graph", () => <GraphLine {...sharedProps} />)
	.add("Advanced", () => <GraphAdvanced {...sharedProps} />);
