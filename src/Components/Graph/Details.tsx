import React, { ReactElement, useContext } from "react";
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Symbol } from "../Dice/Symbol";
import { ModeContext } from "./ModeContext";
import { IsBlank } from "./Functions";
import { FormattedMessage, useIntl } from "react-intl";

const join = (symbols: ReactElement[], separator: string): ReactElement => (
	<>
		{symbols.reduce((prev, curr) => (
			<>
				{prev} {separator} {curr}
			</>
		))}
	</>
);

export const GraphDetails = (): ReactElement => {
	const intl = useIntl();
	const { mode, alternateMode, negativeMode } = useContext(ModeContext);
	const plus = [<Symbol key={mode} dieSymbol={mode} />];
	const minus = [<Symbol key={negativeMode} dieSymbol={negativeMode} />];

	if (mode === "Success") {
		plus.push(<Symbol dieSymbol="Triumph" />);
		minus.push(<Symbol dieSymbol="Despair" />);
	}

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>
					<FormattedMessage id="Symbols" />
				</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<List>
					<ListItem>
						<ListItemText primary={<FormattedMessage id="Symbols.Mode" values={{ a: intl.messages[`Dice.${mode}`] }} />} secondary={join(plus, intl.messages["Advanced.And"] as string)} />
					</ListItem>
					{!IsBlank(alternateMode) && (
						<>
							<ListItem>
								<ListItemText
									primary={<FormattedMessage id="Symbols.Calculation" />}
									secondary={
										<>
											({join(plus, "+")}) - ({join(minus, "+")})
										</>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary={<FormattedMessage id="Symbols.Mode" values={{ a: intl.messages[`Dice.${negativeMode}`] }} />}
									secondary={join(minus, intl.messages["Advanced.And"] as string)}
								/>
							</ListItem>
						</>
					)}
				</List>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
