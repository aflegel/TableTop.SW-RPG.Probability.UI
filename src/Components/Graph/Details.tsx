import React, { FunctionComponent, ReactElement } from "react";
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { DieSymbol } from "../../Models";
import { Symbol } from "../Dice/Symbol";
import { IExtendedModeProps, IModeProps } from ".";

export type IGraphDetailsProps = IModeProps & IExtendedModeProps;

export const GraphDetails: FunctionComponent<IGraphDetailsProps> = (props: IGraphDetailsProps): ReactElement => {
	const plus = [<Symbol dieSymbol={props.mode} />];
	const minus = [<Symbol dieSymbol={props.negativeMode} />];

	if (props.mode === DieSymbol.Success) {
		plus.push(<Symbol dieSymbol={DieSymbol.Triumph} />);
		minus.push(<Symbol dieSymbol={DieSymbol.Despair} />);
	}

	const join = (symbols: JSX.Element[], separator: string): ReactElement => <>{symbols.reduce((prev, curr) => <>{prev} {separator} {curr}</>)}</>;

	const getCalculation = (): ReactElement => <>({join(plus, "+")}) - ({join(minus,  "+")})</>;

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Symbols and Calculations</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<List>
					<ListItem>
						<ListItemText primary={`${DieSymbol[props.mode]} Symbols`} secondary={join(plus, "and")} />
					</ListItem>
					<ListItem>
						<ListItemText primary={`${DieSymbol[props.negativeMode]} Symbols`} secondary={join(minus, "and")}  />
					</ListItem>
					<ListItem>
						<ListItemText primary="Calculation" secondary={getCalculation()} />
					</ListItem>
				</List>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
