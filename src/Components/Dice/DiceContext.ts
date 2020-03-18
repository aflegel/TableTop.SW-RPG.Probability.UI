import { createContext } from "react";
import { PoolDice } from "../../Models";

const emptyData: PoolDice[] = [];

export const DiceContext = createContext(emptyData)
