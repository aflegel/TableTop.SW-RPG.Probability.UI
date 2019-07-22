import { configure, addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import "sw-rpg-icons/css/sw-rpg-icons.scss";
import "sw-rpg-icons/css/sw-rpg-colors.scss";

function loadStories() {
	require("./stories/index.tsx");
	require("./stories/Search.tsx");
	require("./stories/Graph.tsx");
	// You can require as many stories as you need.
}
addDecorator(withA11y);

configure(loadStories, module);
