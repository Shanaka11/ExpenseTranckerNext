import { SearchParams } from '@/ServerServices/SearchParamType';

export const generateTagFilter = (searchParams?: SearchParams) => {
	const where = new Map();

	if (searchParams === undefined) return;

	for (const [key, value] of Object.entries(searchParams)) {
		if (value === undefined) continue;
		// For now we will ignore arrays
		if (Array.isArray(value)) continue;

		const [filterKey, filterValue] = value.split(':');
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
	}
	return Object.fromEntries(where);
};
