import React, { FunctionComponent } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { DieSymbol } from "../../Models/DieSymbol";
import { Symbol } from "../Dice/Symbol";

export interface IGraphDetailsProps {
	mode: DieSymbol;
	counterMode: DieSymbol;
}

export const GraphDetails: FunctionComponent<IGraphDetailsProps> = (props: IGraphDetailsProps) => {
	let plus = [<Symbol dieSymbol={props.mode} />];
	let minus = [<Symbol dieSymbol={props.counterMode} />];

	if (props.mode === DieSymbol.Success) {
		plus.push(<Symbol dieSymbol={DieSymbol.Triumph} />);
		minus.push(<Symbol dieSymbol={DieSymbol.Despair} />);
	}

	const GetCalculation = (plus: JSX.Element[], minus: JSX.Element[]) => {
		return (
			<>
				{plus} - {minus}
			</>
		);
	};

	const GetExtras = (symbol: DieSymbol) => {
		if (props.mode === DieSymbol.Success)
			return (
				<>
					and <Symbol dieSymbol={symbol} />
				</>
			);
		else return <></>;
	};

	const GetPositive = () => {
		return <><Symbol dieSymbol={props.mode} /> {GetExtras(DieSymbol.Triumph)}</>;
	}

	const GetNegative = () => {
		return <><Symbol dieSymbol={props.counterMode} /> {GetExtras(DieSymbol.Despair)}</>;
	}

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Symbols and Calculations</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<List>
					<ListItem>
						<ListItemText primary={`${DieSymbol[props.mode]} Symbols`} secondary={GetPositive()} />
					</ListItem>
					<ListItem>
						<ListItemText primary={`${DieSymbol[props.counterMode]} Symbols`} secondary={GetNegative()}  />
					</ListItem>
					<ListItem>
						<ListItemText primary="Calculation" secondary={GetCalculation(plus, minus)} />
					</ListItem>
				</List>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
