import React from "react";
import { storiesOf } from "@storybook/react";
import { Die } from "../../src/Components/Dice/Die";
import { DieSeries } from "../../src/Components/Dice/DieSeries";
import { Dice } from "../../src/Components/Dice/Dice";
import { DieType } from "../../src/Models";

storiesOf("Die", module)
	.add("Basic Icons", () => (
		<>
			<Die dieType={DieType.Ability} />
			<Die dieType={DieType.Difficulty} />
			<Die dieType={DieType.Proficiency} />
			<Die dieType={DieType.Challenge} />
			<Die dieType={DieType.Boost} />
			<Die dieType={DieType.Setback} />
		</>
	))
	.add("Icon Series", () => {
		const props = { dice: { dieId: DieType.Ability, quantity: 3 } };

		return (
			<>
				<DieSeries {...props} />
			</>
		);
	})

	.add("Dice Pool", () => {
		const props = { dice: [{ dieId: DieType.Ability, quantity: 3 }, { dieId: DieType.Difficulty, quantity: 2 }] };

		return (
			<>
				<Dice {...props} />
			</>
		);
	});
