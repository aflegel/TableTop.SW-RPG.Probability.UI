import React, { ReactElement } from "react";
import { Grid, Button } from "@material-ui/core";
import { RollResultList } from "./ResultList";

import { RollContainer } from "../../Models/Roll";

interface GraphResultListProps {
	poolRoll: RollContainer;
	resultCallback: Function;
}

/**
 * Renders a table with the raw data used for populating the tables and statistics data
 */
export const ResultListContainer = (props: GraphResultListProps): ReactElement => {

	return <Grid container>
		<Grid item xs={12}>
			<Button color="primary" onClick={(): void => { props.resultCallback(); }}>Results</Button>
		</Grid>
		<Grid item xs={12} md={6}>
			<RollResultList poolRoll={props.poolRoll.positiveRolls}></RollResultList>
		</Grid>
		<Grid item xs={12} md={6}>
			<RollResultList poolRoll={props.poolRoll.negativeRolls}></RollResultList>
		</Grid>
	</Grid>;
};
