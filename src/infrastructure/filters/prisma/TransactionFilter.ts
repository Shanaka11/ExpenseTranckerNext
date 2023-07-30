import { SearchParams } from '@/ServerServices/SearchParamType';

export const generateTransactionFilter = (searchParams?: SearchParams) => {
	const where = new Map();

	const addToWhere = (
		key: string,
		filterKey: string,
		filterValue: string | number | Date
	) => {
		const filterItem = where.get(key);
		if (filterItem !== undefined) {
			filterItem[filterKey] = filterValue;
			where.set(key, filterItem);
		} else {
			const newFilterItem = {
				[filterKey]: filterValue,
			};
			where.set(key, newFilterItem);
		}
	};

	if (searchParams === undefined) return;

	for (const [key, value] of Object.entries(searchParams)) {
		if (value === undefined) continue;
		// For now we will ignore arrays
		if (Array.isArray(value)) continue;

		const [filterKey, filterValue] = value.split(':');
		// if key is amount, then convert it to a number
		if (key === 'amount') {
			addToWhere(key, filterKey, Number(filterValue));
		}
		// if kys is date, fromDate, toDate then handle it accordingly
		if (key === 'date' || key === 'to' || key === 'from') {
			addToWhere('date', filterKey, new Date(filterValue));
		}
	}
	return Object.fromEntries(where);
};
