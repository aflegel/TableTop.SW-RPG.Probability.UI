import { configure, addDecorator  } from "@storybook/react";

import "sw-rpg-icons/css/sw-rpg-icons.scss";
import "sw-rpg-icons/css/sw-rpg-colors.scss";

function loadStories() {
	require("./stories/index.js");
	require("./stories/search.js");
	require("./stories/graph.js");
	// You can require as many stories as you need.
}

configure(loadStories, module);
