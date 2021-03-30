import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react";
import { Die } from "../Components/Dice/Die";
import { DieType } from "../Models";

interface ButtonProps {
	dieType: DieType;
}

export default {
	title: "Example/Die Symbols",
	component: Die,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Die {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	dieType: "Ability",
};
