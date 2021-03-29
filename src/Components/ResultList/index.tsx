import React, { ReactElement, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { RollResultList } from "./ResultList";
import { PoolDice } from "../../Models";
import { useResults } from "../../Hooks/ResultsApi";
import { Dice } from "../Dice/Dice";

interface GraphResultListProps {
	dice: PoolDice[];
}

/**
 * Renders a table with the raw data used for populating the tables and statistics data
 */
export const ResultListContainer = (props: GraphResultListProps): ReactElement => {
	const { statistics, clearResults, getResultsAsync } = useResults();

	useEffect(() => {
		clearResults();
	}, [props.dice]);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Button
					color="primary"
					onClick={(): void => {
						getResultsAsync(props.dice);
					}}
				>
					Results
				</Button>
			</Grid>
			<Grid item xs={12} md={6}>
				<RollResultList poolRoll={statistics.positiveResults}></RollResultList>
			</Grid>
			<Grid item xs={12} md={6}>
				<RollResultList poolRoll={statistics.negativeResults}></RollResultList>
			</Grid>
		</Grid>
	);
};
