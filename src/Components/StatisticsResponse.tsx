import React from "react";
import { Dice } from "./Dice/Dice";
import { StatisticsState } from "../Hooks/StatisticsApi";
import { FormattedMessage } from "react-intl";

export const StatisticsResponse = (props: { statistics: StatisticsState }) => {
	const hasData = props.statistics?.poolCombination?.dice?.length;

	if (hasData) {
		return <Dice dice={props.statistics.poolCombination.dice} />;
	} else {
		return (
			<p>
				<FormattedMessage id="BadRequest" />
			</p>
		);
	}
};
