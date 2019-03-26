import { ILoggedCoffee } from '../../models';

export enum LoggedCoffeeMode {
	view,
	log
}

export interface ILoggedCoffeeState {
	isLoading: boolean;
	loggedCoffee: ILoggedCoffee[];
	mode: LoggedCoffeeMode;
}

export const initialState: ILoggedCoffeeState = {
	isLoading: true,
	loggedCoffee: [],
	mode: LoggedCoffeeMode.view,
};
