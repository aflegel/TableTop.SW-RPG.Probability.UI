import { createContext, ReactNode } from "react";
import { DieSymbol } from "../../Models";
import { PoolCombination, PoolStatistic } from "../../Models/Statistics";
import { GetFrequencyTotal } from "./Functions";
import { GetExtendedModes, ModeContext } from "./ModeContext";

export interface DataSetProps {
	totalFrequency: number;
	filteredSet: PoolStatistic[];
}

const emptyData: DataSetProps = {
	filteredSet: [],
	totalFrequency: 0,
};

const getDataSet = (poolCombination: PoolCombination, mode: DieSymbol): DataSetProps => {
	const filteredSet = poolCombination?.statistics?.filter((f) => f.symbol === mode).sort((n1, n2) => n1.quantity - n2.quantity) ?? [];

	return { filteredSet: filteredSet, totalFrequency: GetFrequencyTotal(filteredSet) };
};

export const DataContext = createContext(emptyData);

interface ProviderProps {
	poolCombination: PoolCombination;
	mode: DieSymbol;
	children: ReactNode;
}

export const DataContextProvider = (props: ProviderProps) => {
	const dataSet = getDataSet(props.poolCombination, props.mode);

	return (
		<DataContext.Provider value={dataSet}>
			<ModeContext.Provider value={GetExtendedModes(props.mode)}>{dataSet.filteredSet.length > 1 && props.children}</ModeContext.Provider>
		</DataContext.Provider>
	);
};
