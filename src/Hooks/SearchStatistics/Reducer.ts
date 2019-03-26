import { CoffeeApiActions, LoadingAction, LoggedCoffeeFetchedAction, SetModeAction} from './Actions';
import { ILoggedCoffeeState, LoggedCoffeeMode } from './Types';

export const reducer = (state: ILoggedCoffeeState, action: CoffeeApiActions) => {
	switch (action.type) {
		case LoadingAction:
			return {
				...state,
				isLoading: true,
			};
		case LoggedCoffeeFetchedAction:
			return {
				...state,
				isLoading: false,
				loggedCoffee: action.loggedCoffee,
				mode: LoggedCoffeeMode.view,
			};
		case SetModeAction:
			return {
				...state,
				mode: action.mode,
			};
		default:
			return state;
	}
};
