import { configure, addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import "sw-rpg-icons/css/sw-rpg-icons.scss";
import "sw-rpg-icons/css/sw-rpg-colors.scss";
import "../src/Styles/App.scss";

function loadStories() {
	require("./stories/index.js");
	require("./stories/search.js");
	require("./stories/graph.js");
	// You can require as many stories as you need.
}
addDecorator(withA11y);

configure(loadStories, module);
