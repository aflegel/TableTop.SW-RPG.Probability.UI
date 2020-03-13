import React from "react";
import { PoolStatistic } from "../../Models/Statistics";

export interface DataSetProps {
	totalFrequency: number;
	filteredSet: PoolStatistic[];
}

const emptyData: DataSetProps = {
	filteredSet: [],
	totalFrequency: 0
};

export const DataContext = React.createContext(emptyData);

