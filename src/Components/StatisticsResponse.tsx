import { Dice } from "./Dice/Dice";
import { FormattedMessage } from "react-intl";
import { PoolDice } from "../Models";

export const StatisticsResponse = (props: { dice: PoolDice[] }) => {
	const hasData = props.dice?.length;

	if (hasData) {
		return <Dice dice={props.dice} />;
	} else {
		return (
			<p>
				<FormattedMessage id="BadRequest" />
			</p>
		);
	}
};
