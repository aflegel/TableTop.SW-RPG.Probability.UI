import React, { ChangeEvent, ReactElement, ReactNode, useContext } from "react";
import { AppBar, Toolbar, Typography, FormControl, MenuItem, Select, Grid, makeStyles, Theme, createStyles } from "@material-ui/core";
import { FormattedMessage, useIntl } from "react-intl";
import { IntlWrapperContext, Locales } from "../../Hooks/IntlWrapper";

const useStyles = makeStyles((theme: Theme) => {
	const selectColor = theme.palette.getContrastText(theme.palette.primary.main);

	return createStyles({
		formControl: {
			minWidth: 120,
		},
		colorInherit: {
			color: "inherit !important",
		},
		select: {
			"&:before, &:after": {
				borderColor: `${selectColor} !important`,
			},
		},
	});
});

export const NavMenu = (): ReactElement => {
	const intl = useIntl();
	const intlWrapper = useContext(IntlWrapperContext);
	const classes = useStyles();

	const handleChange = (event: ChangeEvent<{ name?: string | undefined; value: any }>, child: ReactNode) => intlWrapper.update((event.target.value as Locales) || "en-us");

	return (
		<AppBar position="static">
			<Toolbar>
				<Grid justify="space-between" container>
					<Grid item>
						<Typography variant="h6" color="inherit">
							<FormattedMessage id="Title" />
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h6" color="inherit">
							<FormControl className={classes.formControl}>
								<Select
									onChange={handleChange}
									value={intlWrapper.current.locale}
									className={[classes.select, classes.colorInherit].join(" ")}
									inputProps={{
										name: "size",
										id: "size",
										classes: {
											icon: classes.colorInherit,
										},
										"aria-label": intl.formatMessage({ id: "Language" }),
									}}
								>
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
