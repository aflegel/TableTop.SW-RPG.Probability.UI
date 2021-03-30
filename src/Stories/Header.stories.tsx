import React from "react";
import { Story, Meta } from "@storybook/react";
import { DieIncrementer } from "../Components/Search/Incrementer";
import { DieType } from "../Models";

const nullCallback = () => null;
interface ButtonProps {
	dieType: DieType;
}
export default {
	title: "Example/Header",
	component: DieIncrementer,
} as Meta;

const Template: Story<ButtonProps> = (args) => {
	return <DieIncrementer addDieCallback={nullCallback} removeDieCallback={nullCallback} {...args} />;
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
	dieType: "Proficiency",
};
