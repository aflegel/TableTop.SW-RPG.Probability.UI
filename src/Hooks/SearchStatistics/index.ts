import { useReducer } from 'react';
import { ICoffeeToLog, ILoggedCoffee } from '../../models';
import { coffeeServiceSingleton, ICoffeeService } from '../../services/DiceService';
import { loadingAction, loggedCoffeeFetchedAction, setModeAction } from './Actions';
import { reducer } from './Reducer';
import { initialState, LoggedCoffeeMode } from './Types';

export { LoggedCoffeeMode } from './Types';

/**
 * Logged Coffee custom hook. Wraps state and API interactions for Logged Coffee.
 */
export const useLoggedCoffee = () => {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const service: ICoffeeService = coffeeServiceSingleton;

	/**
	 * Get all logged coffee from the API.
	 */
	const getLoggedCoffeeAsync = (): void => {
		dispatch(loadingAction());
		service.getAllAsync()
			.then((loggedCoffee: ILoggedCoffee[]) => {
				dispatch(loggedCoffeeFetchedAction(loggedCoffee));
			});
	};

	/**
	 * Post new logged coffee to API.
	 * @param coffeeToLog Coffee to log
	 */
	const logCoffeeAsync = (coffeeToLog: ICoffeeToLog): void => {
		dispatch(loadingAction());
		service.logCoffeeAsync(coffeeToLog)
			.then((loggedCoffee: ILoggedCoffee) => {
				dispatch(loggedCoffeeFetchedAction([...state.loggedCoffee, loggedCoffee]));
			});
	};

	/**
	 * Set the mode for the Logged Coffee Page.
	 * @param mode Mode the Logged Coffee Page is in.
	 */
	const setMode = (mode: LoggedCoffeeMode = LoggedCoffeeMode.view): void => {
		dispatch(setModeAction(mode));
	};

	return { state, getLoggedCoffeeAsync, logCoffeeAsync, setMode };
};
