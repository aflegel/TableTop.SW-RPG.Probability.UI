import { ReactElement } from "react";
import { Typography, Table, TableBody, TableRow, TableHead, TableCell, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TableFooter } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ResultListRow } from "./ResultListRow";
import { RollResult } from "../../Models/Roll";

/**
 * Renders a table with the raw data used for populating the tables and statistics data
 */
export const RollResultList = (props: { poolRoll: RollResult[] }): ReactElement => {
	return (
		<>
			{!!props.poolRoll?.length && (
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography>Dice</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell align="right">Symbols</TableCell>
									<TableCell align="right">Frequency</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<ResultListRow poolResults={props.poolRoll} />
							</TableBody>
							<TableFooter>
								<TableRow>
									<TableCell></TableCell>
									<TableCell align="right">
										<>
											{props.poolRoll.length}, {props.poolRoll.map((s) => s.frequency).reduce((prev, curr) => (prev || 0) + curr)}
										</>
									</TableCell>
								</TableRow>
							</TableFooter>
						</Table>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			)}
		</>
	);
};
