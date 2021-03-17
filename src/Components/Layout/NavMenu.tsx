import React, { ChangeEvent, ReactElement, ReactNode, useContext } from "react";
import { AppBar, Toolbar, Typography, Button, FormControl, InputLabel, MenuItem, Select, Grid } from "@material-ui/core";
import { useIntl } from "react-intl";
import { IntlWrapperContext, Locales } from "../../Hooks/IntlWrapper";

export const NavMenu = (): ReactElement => {
	const intl = useIntl();
	const intlWrapper = useContext(IntlWrapperContext);

	const handleChange = (event: ChangeEvent<{ name?: string | undefined; value: any }>, child: ReactNode) => intlWrapper.update((event.target.value as Locales) || "en-us");

	return (
		<AppBar position="static">
			<Toolbar>
				<Grid justify="space-between" container>
					<Grid item>
						<Typography variant="h6" color="inherit">
							<Button color="inherit">{intl.messages.Title} Visualizer</Button>
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h6" color="inherit">
							<FormControl>
								<InputLabel id="demo-simple-select-label">Language</InputLabel>
								<Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={handleChange} value={intlWrapper.current.locale}>
									<MenuItem value="en-us">English</MenuItem>
									<MenuItem value="jp">Japanese</MenuItem>
									<MenuItem value="mi">Te Reo</MenuItem>
								</Select>
							</FormControl>
						</Typography>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};
