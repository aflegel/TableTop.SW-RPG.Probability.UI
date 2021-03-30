import React, { ReactElement } from "react";
import { Grid, Card, CardContent, ListItem } from "@material-ui/core";

import { GraphBreakdown } from "./Breakdown";
import { GraphDetails } from "./Details";
import { GraphLine } from "./Line";
import { GraphStatisticsList } from "./StatisticsList";
import { GraphAdvanced } from "./Advanced";
import { GraphTitle } from "./Title";
import { ModeProps } from "./ModeContext";
import { DataContextProvider } from "./DataContext";
import { PoolCombination } from "../../Models/Statistics";

interface StatisticsResults {
	poolCombination: PoolCombination;
}

/**
 * Configures the data for a given symbol and renders a graph and a statistics breakdown panel
 */
export const Graph = (props: StatisticsResults & ModeProps): ReactElement => {
	return (
		<DataContextProvider {...props}>
			<ListItem divider>
				<Grid container>
					<Grid item xs={12}>
						<Card>
							<CardContent>
								<GraphTitle />
								<GraphLine />
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} lg={6}>
						<GraphDetails />
					</Grid>
					<Grid item xs={12} lg={6}>
						<GraphBreakdown />
					</Grid>
					<Grid item xs={12} lg={6}>
						<GraphAdvanced />
					</Grid>
					<Grid item xs={12} lg={6}>
						<GraphStatisticsList />
					</Grid>
				</Grid>
			</ListItem>
		</DataContextProvider>
	);
};
