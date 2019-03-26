import { PoolDice } from "../Models/PoolDice";
import { PoolCombinationState } from "../Hooks/SearchStatistics/Models/PoolCombinationState";
import { DieType } from "../Models/DieType";
import { PoolContainer } from "../Models/PoolContainer";

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

// Declare a "discriminated union" type. This guarantees that all references to "type" properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
	addSearchDie: (poolDie: PoolDice) => <AddSearchDieAction>{ type: "ADD_SEARCH_DIE", poolDie: poolDie },
	removeSearchDie: (poolDie: PoolDice) => <RemoveSearchDieAction>{ type: "REMOVE_SEARCH_DIE", poolDie: poolDie },
	requestDiceStatistics: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
		// Only load data if it's something we don't already have (and are not already loading)
		//if (positivePoolId !== getState().diceStatistics.positivePoolId) {
		const data = JSON.stringify(getState().diceStatistics.searchDice);

		const fetchTask = fetch(`api/Search/GetStatistics?data=${data}`)
			.then(response => response.json() as Promise<PoolContainer>)
			.then(data => {
				dispatch({ type: "RECEIVE_DICE_STATISTICS", poolCombinationContainer: data });
			});

		// addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
		dispatch({ type: "REQUEST_DICE_STATISTICS" });
		//}
	}
};

export function FormatDice(dice: PoolDice[]): string {
	return "{" + dice.map(map => "{" + map.dieId + "," + map.quantity + "}").join(",") + "}";
}

export function CopyDice(dice: PoolDice[]): PoolDice[] {
	const replication: PoolDice[] = [];

	dice.forEach(item => replication.push({ dieId: item.dieId, quantity: item.quantity }));

	return replication;
}

export function MergeDice(dice: PoolDice[], addDie: PoolDice) {
	const existingRecord = dice.find(f => f.dieId == addDie.dieId);

	if (existingRecord != null) existingRecord.quantity += addDie.quantity;
	else dice.push(addDie);
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: PoolCombinationState = {
	poolCombinationContainer: {},
	searchDice: [{ dieId: DieType.Ability, quantity: 1 }, { dieId: DieType.Difficulty, quantity: 1 }],
	isLoading: false,
	negativePoolId: 0
};

export const reducer: Reducer<PoolCombinationState> = (state: PoolCombinationState, incomingAction: Action) => {
	const action = incomingAction as KnownAction;
	switch (action.type) {
		case "ADD_SEARCH_DIE":
		const addDice = CopyDice(state.searchDice);

			switch (action.poolDie.dieId) {
				case DieType.Ability:
				case DieType.Proficiency:
					if (
						addDice
							.filter(f => f.dieId == DieType.Ability || f.dieId == DieType.Proficiency)
							.reduce((total, obj) => {
								return total + obj.quantity;
							}, 0) < 6
					)
						MergeDice(addDice, action.poolDie);
					break;
				case DieType.Boost:
					if (
						addDice
							.filter(f => f.dieId == DieType.Boost)
							.reduce((total, obj) => {
								return total + obj.quantity;
							}, 0) < 4
					)
						MergeDice(addDice, action.poolDie);
					break;
				case DieType.Difficulty:
				case DieType.Challenge:
					if (
						addDice
							.filter(f => f.dieId == DieType.Difficulty || f.dieId == DieType.Challenge)
							.reduce((total, obj) => {
								return total + obj.quantity;
							}, 0) < 6
					)
						MergeDice(addDice, action.poolDie);
					break;
				case DieType.Setback:
					if (
						addDice
							.filter(f => f.dieId == DieType.Setback)
							.reduce((total, obj) => {
								return total + obj.quantity;
							}, 0) < 4
					)
						MergeDice(addDice, action.poolDie);
					break;
			}

			return {
				poolCombinationContainer: state.poolCombinationContainer,
				searchDice: addDice,
				negativePoolId: state.negativePoolId + 1,
				isLoading: false
			};
		case "REMOVE_SEARCH_DIE":
		const removeDice = CopyDice(state.searchDice);
		const existingRecord = removeDice.find(f => f.dieId == action.poolDie.dieId);

			if (existingRecord != null) {
				if (existingRecord.quantity > 1) existingRecord.quantity -= action.poolDie.quantity;
				else removeDice.splice(removeDice.indexOf(existingRecord), 1);
			}

			return {
				poolCombinationContainer: state.poolCombinationContainer,
				negativePoolId: 0,
				searchDice: removeDice,
				isLoading: false
			};
		case "REQUEST_DICE_STATISTICS":
			return {
				poolCombinationContainer: state.poolCombinationContainer,
				negativePoolId: 0,
				searchDice: state.searchDice,
				isLoading: true
			};
		case "RECEIVE_DICE_STATISTICS":
			// Only accept the incoming data if it matches the most recent request. This ensures we correctly
			// handle out-of-order responses.
			//if (action.positivePoolId === state.positivePoolId && action.negativePoolId === state.negativePoolId) {
			if (action.poolCombinationContainer.baseDice != null) {
				return {
					poolCombinationContainer: action.poolCombinationContainer,
					negativePoolId: 0,
					searchDice: action.poolCombinationContainer.baseDice.slice(),
					isLoading: false
				};
			}
			break;

		//}
		//break;
		default:
			// The following line guarantees that every action in the KnownAction union has been covered by a case above
			const exhaustiveCheck: never = action;
	}

	return state || unloadedState;
};
