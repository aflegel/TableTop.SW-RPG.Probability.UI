import React, { ReactElement } from "react";
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Symbol } from "../Dice/Symbol";
import { ExtendedModeProps, ModeProps } from ".";
import { IsBlank } from "./Functions";

export type GraphDetailsProps = ModeProps & ExtendedModeProps;

export const GraphDetails = (props: GraphDetailsProps): ReactElement => {
	const plus = [<Symbol key={props.mode} dieSymbol={props.mode} />];
	const minus = [<Symbol key={props.negativeMode} dieSymbol={props.negativeMode} />];

	if (props.mode === "Success") {
		plus.push(<Symbol dieSymbol="Triumph" />);
		minus.push(<Symbol dieSymbol="Despair" />);
	}

	const join = (symbols: ReactElement[], separator: string): ReactElement => <>{symbols.reduce((prev, curr) => <>{prev} {separator} {curr}</>)}</>;

	return <ExpansionPanel>
		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			<Typography>Symbols and Calculations</Typography>
		</ExpansionPanelSummary>
		<ExpansionPanelDetails>
			<List>
				<ListItem>
					<ListItemText primary={`${props.mode} Symbols`} secondary={join(plus, "and")} />
				</ListItem>
				{
					!IsBlank(props.alternateMode) &&
					<>
						<ListItem>
							<ListItemText primary="Calculation" secondary={<>({join(plus, "+")}) - ({join(minus, "+")})</>} />
						</ListItem>
						<ListItem>
							<ListItemText primary={`${props.negativeMode} Symbols`} secondary={join(minus, "and")} />
						</ListItem>
					</>
				}
			</List>
		</ExpansionPanelDetails>
	</ExpansionPanel>;
};
