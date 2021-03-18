import React, { ChangeEvent, ReactElement, ReactNode, useContext } from "react";
import { AppBar, Toolbar, Typography, Button, FormControl, InputLabel, MenuItem, Select, Grid } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { IntlWrapperContext, Locales } from "../../Hooks/IntlWrapper";

export const NavMenu = (): ReactElement => {
	const intlWrapper = useContext(IntlWrapperContext);

	const handleChange = (event: ChangeEvent<{ name?: string | undefined; value: any }>, child: ReactNode) => intlWrapper.update((event.target.value as Locales) || "en-us");

	return (
		<AppBar position="static">
			<Toolbar>
				<Grid justify="space-between" container>
					<Grid item>
						<Typography variant="h6" color="inherit">
							<Button color="inherit">
								<FormattedMessage id="Title" />
							</Button>
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h6" color="inherit">
							<FormControl>
								<InputLabel id="language">Language</InputLabel>
								<Select labelId="language" onChange={handleChange} value={intlWrapper.current.locale}>
									<MenuItem value="en-us">English</MenuItem>
									<MenuItem value="jp">日本語</MenuItem>
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
