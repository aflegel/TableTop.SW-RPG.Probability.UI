export const Format = (predicate: number, digits: boolean): string => {
	return new Intl.NumberFormat("en-Us", { minimumFractionDigits: digits ? 4 : 0 }).format(predicate);
};
