import React, { FunctionComponent, ReactElement } from "react";
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { DieSymbol } from "../../Models";
import { Symbol } from "../Dice/Symbol";
import { IExtendedModeProps, IModeProps } from ".";
import { IsBlank } from "./Functions";

export type IGraphDetailsProps = IModeProps & IExtendedModeProps;

export const GraphDetails: FunctionComponent<IGraphDetailsProps> = (props: IGraphDetailsProps): ReactElement => {
	const plus = [<Symbol dieSymbol={props.mode} />];
	const minus = [<Symbol dieSymbol={props.negativeMode} />];

	if (props.mode === "Success") {
		plus.push(<Symbol dieSymbol="Triumph" />);
		minus.push(<Symbol dieSymbol="Despair" />);
	}

	const join = (symbols: JSX.Element[], separator: string): ReactElement => <>{symbols.reduce((prev, curr) => <>{prev} {separator} {curr}</>)}</>;

	const getCalculation = (): ReactElement => <>({join(plus, "+")}) - ({join(minus, "+")})</>;

	const alternateCalculations = (): ReactElement =>
		<>
			<ListItem>
				<ListItemText primary="Calculation" secondary={getCalculation()} />
			</ListItem>
			<ListItem>
				<ListItemText primary={`${props.negativeMode} Symbols`} secondary={join(minus, "and")} />
			</ListItem>
		</>;

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Symbols and Calculations</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<List>
					<ListItem>
						<ListItemText primary={`${props.mode} Symbols`} secondary={join(plus, "and")} />
					</ListItem>
					{!IsBlank(props.alternateMode) && alternateCalculations()}
				</List>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
