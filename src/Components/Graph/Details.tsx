import React, { ReactElement, useContext } from "react";
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Symbol } from "../Dice/Symbol";
import { ModeContext } from "./ModeContext";
import { IsBlank } from "./Functions";
import { FormattedMessage } from "react-intl";

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
						<ListItemText primary={`${mode} Symbols`} secondary={join(plus, "and")} />
					</ListItem>
					{!IsBlank(alternateMode) && (
						<>
							<ListItem>
								<ListItemText
									primary="Calculation"
									secondary={
										<>
											({join(plus, "+")}) - ({join(minus, "+")})
										</>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemText primary={`${negativeMode} Symbols`} secondary={join(minus, "and")} />
							</ListItem>
						</>
					)}
				</List>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
