import React, { FunctionComponent } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography } from "@material-ui/core";

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

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography className={""}>Symbols and Calculations</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<dl>
					<dt>{DieSymbol[props.mode]} Symbols</dt>
					<dd>
						<Symbol dieSymbol={props.mode} /> {GetExtras(DieSymbol.Triumph)}
					</dd>
					<dt>{DieSymbol[props.counterMode]} Symbols</dt>
					<dd>
						<Symbol dieSymbol={props.counterMode} /> {GetExtras(DieSymbol.Despair)}
					</dd>
					<dt>Calculation</dt>
					<dd>{GetCalculation(plus, minus)}</dd>
				</dl>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
