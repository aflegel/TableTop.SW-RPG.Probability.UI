import React from "react";
import { storiesOf } from "@storybook/react";
import { Die } from "../../src/Components/Dice/Die";
import { DieSeries } from "../../src/Components/Dice/DieSeries";
import { Dice } from "../../src/Components/Dice/Dice";

const sharedProps = { dice: [{ dieType: "Ability", quantity: 3 }, { dieType: "Difficulty", quantity: 2 }] };


storiesOf("Die", module)
	.add("Basic Icons", () => (
		<>
			<Die dieType="Ability" />
			<Die dieType="Difficulty" />
			<Die dieType="Proficiency" />
			<Die dieType="Challenge" />
			<Die dieType="Boost" />
			<Die dieType="Setback" />
		</>
	))
	.add("Icon Series", () => <DieSeries dice={sharedProps.dice.find(f => f.dieType === "Ability")} />)
	.add("Dice Pool", () => <Dice {...sharedProps} />);
