export const encodeFilterString = (key: string, filterString: string) => {
	const queryParam = filterString.split(' ');

	switch (queryParam[0]) {
		case '=':
			return `${key}=equals:${queryParam
				.slice(1, queryParam.length)
				.join(' ')}&`;
		case '>':
			return `${key}=gt:${formatFilterValue(
				queryParam.slice(1, queryParam.length).join(' ')
			)}&`;
		case '>=':
			return `${key}=gte:${formatFilterValue(
				queryParam.slice(1, queryParam.length).join(' ')
			)}&`;
		case '<':
			return `${key}=lt:${formatFilterValue(
				queryParam.slice(1, queryParam.length).join(' ')
			)}&`;
		case '<=':
			return `${key}=lte:${formatFilterValue(
				queryParam.slice(1, queryParam.length).join(' ')
			)}&`;
		case '^':
			return `${key}=in:${formatFilterValue(
				queryParam.slice(1, queryParam.length).join(' ')
			)}&`;
		case '~':
			return `${key}=startsWith:${formatFilterValue(
				queryParam.slice(1, queryParam.length).join(' ')
			)}&`;
		default:
			return `${key}=startsWith:${formatFilterValue(
				queryParam.slice(0, queryParam.length).join(' ')
			)}&`;
	}
};

export const decodeFilterString = (filterString: string) => {
	const queryParam = filterString.split(':');
	switch (queryParam[0]) {
		case 'equals':
			return `= "${queryParam[1]}"`;
		case 'gt':
			return `> "${queryParam[1]}"`;
		case 'gte':
			return `>= "${queryParam[1]}"`;
		case 'lt':
			return `< "${queryParam[1]}"`;
		case 'lte':
			return `<= "${queryParam[1]}"`;
		case 'startsWith':
			return `~ "${queryParam[1]}"`;
		case 'in':
			return `^ "${queryParam[1]}"`;
		default:
			return `~ "${queryParam[1]}"`;
	}
};

export const createQueryString = (data: { [key: string]: string }) => {
	// Construct the query params according to the filter texts, do not apply params if input is empty or ''
	let queryString = '?';

	Object.entries(data).forEach((entry) => {
		if (entry[1] !== '' && entry[1] !== undefined)
			queryString += encodeFilterString(entry[0], entry[1]);
	});

	return queryString.slice(0, -1);
};

export const formatFilterValue = (filterValue: string) => {
	if (filterValue === '' || filterValue === undefined || filterValue === null)
		return '';
	return filterValue.replace(/"/g, '');
};

export const formatFilterValueDate = (filterValue: string) => {
	if (filterValue === '' || filterValue === undefined || filterValue === null)
		return '';
	return formatFilterValue(filterValue.split(' ')[1]);
};

export const formatFilterValueArray = (filterValue: string) => {
	if (filterValue === '' || filterValue === undefined || filterValue === null)
		return [];
	const valueArray = formatFilterValue(filterValue).split(' ')[1].split(';');
	return valueArray;
};

export const matchFilterArrayToObject = (
	filterValue?: string,
	objectArray?: any[],
	mapperFunction?: (object: any) => string
) => {
	if (
		filterValue === undefined ||
		objectArray === undefined ||
		mapperFunction === undefined
	)
		return [];
	const valueArray = formatFilterValueArray(filterValue);
	const filteredValue = objectArray.filter((obj) =>
		valueArray.includes(mapperFunction(obj))
	);
	return filteredValue;
};
