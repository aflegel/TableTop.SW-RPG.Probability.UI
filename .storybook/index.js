import React from "react";
import { storiesOf } from "@storybook/react";
import { Die } from "../src/Components/Dice/Die";
import { DieType } from "../src/Models";

import "sw-rpg-icons/css/sw-rpg-icons.scss";
import "sw-rpg-icons/css/sw-rpg-colors.scss";

storiesOf("Die", module).add("with text", () =>
<div>
	<Die dieType={DieType.Ability} />
	<Die dieType={DieType.Difficulty} />
	<Die dieType={DieType.Proficiency} />
	<Die dieType={DieType.Challenge} />
	<Die dieType={DieType.Boost} />
	<Die dieType={DieType.Setback} />
</div>);
