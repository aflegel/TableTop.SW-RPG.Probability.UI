import React, { FunctionComponent, ReactElement } from "react";
import { Typography, Table, TableBody, TableRow, TableHead, TableCell, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { DieSymbol, PoolStatistic } from "../../Models";
import { Format, NetLabel, IsBlank } from "../Graph/Functions";
import { IModeProps, IExtendedModeProps, IDataSetProps } from ".";

export type IGraphResultList = IModeProps & IExtendedModeProps & IDataSetProps;

/**
 * Renders a table with the raw data used for populating the tables and statistics data
 */
export const GraphResultList: FunctionComponent<IGraphResultList> = (props: IGraphResultList): ReactElement => {

	const extraTotal = (): ReactElement => {
		if (!IsBlank(props.alternateMode)) {
			return <TableCell align="right">Total {DieSymbol[props.alternateMode]}</TableCell>;
		} else {
			return <></>;
		}
	};

	const extraCombinationTotal = (combination: PoolStatistic): ReactElement => {
		if (!IsBlank(props.alternateMode)) {
			return <TableCell align="right">{Format(combination.alternateTotal, false)}</TableCell>;
		} else {
			return <></>;
		}
	};

	return <ExpansionPanel>
		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			<Typography>Data Table</Typography>
		</ExpansionPanelSummary>
		<ExpansionPanelDetails>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="right">{NetLabel(props.mode)}</TableCell>
						<TableCell align="right">Frequency</TableCell>
						{extraTotal()}
					</TableRow>
				</TableHead>
				<TableBody>
					{props.filteredSet.map(combination => (
						<TableRow key={DieSymbol[combination.symbol] + combination.quantity}>
							<TableCell align="right">{combination.quantity}</TableCell>
							<TableCell align="right">{Format(combination.frequency, false)}</TableCell>
							{extraCombinationTotal(combination)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</ExpansionPanelDetails>
	</ExpansionPanel>
};
