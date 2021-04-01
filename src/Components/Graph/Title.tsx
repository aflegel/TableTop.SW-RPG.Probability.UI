import { ReactElement, useContext } from "react";
import { Typography } from "@material-ui/core";
import { ModeContext } from "./ModeContext";
import { IsBlank } from "./Functions";
import { FormattedMessage, useIntl } from "react-intl";

export const GraphTitle = (): ReactElement => {
	const { mode, negativeMode } = useContext(ModeContext);
	const intl = useIntl();

	return (
		<Typography gutterBottom variant="h4" component="h4">
			<FormattedMessage
				id="Distribution"
				values={{
					a: intl.messages[`Dice.${mode}`],
				}}
			/>
			{!IsBlank(negativeMode) ? (
				<FormattedMessage
					id="Distribution.And"
					values={{
						b: intl.messages[`Dice.${negativeMode}`],
					}}
				/>
			) : (
				""
			)}
		</Typography>
	);
};
