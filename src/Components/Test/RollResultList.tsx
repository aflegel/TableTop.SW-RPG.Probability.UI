import React, { FunctionComponent, ReactElement } from "react";
import { Typography, Table, TableBody, TableRow, TableHead, TableCell, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { PoolResult } from "../../Models/PoolResult";
import { Dice } from "../Dice/Dice";
import { Symbol } from "../Dice/Symbol";

export interface IGraphResultListProps {
	poolResult: PoolResult;
}

/**
 * Renders a table with the raw data used for populating the tables and statistics data
 */
export const RollResultList: FunctionComponent<IGraphResultListProps> = (props: IGraphResultListProps): ReactElement => {
	return <ExpansionPanel>
		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			<Typography><Dice dice={props.poolResult.dice} /></Typography>
		</ExpansionPanelSummary>
		<ExpansionPanelDetails>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="right"></TableCell>
						<TableCell align="right">Frequency</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.poolResult.poolResults.map(combination => (
						<TableRow key={combination.symbols.toString() + combination.frequency}>
							<TableCell align="right">{combination.symbols.map(
								icon => <><Symbol dieSymbol={icon.symbol} />{icon.quantity}</>
							)}</TableCell>
							<TableCell align="right">{combination.frequency}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</ExpansionPanelDetails>
	</ExpansionPanel>;
};
