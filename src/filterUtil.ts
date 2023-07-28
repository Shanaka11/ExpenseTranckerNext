export const encodeFilterString = (key: string, filterString: string) => {
	const queryParam = filterString.split(' ');

	if (queryParam[0] == '=') {
		return `${key}=equals:${queryParam.slice(1, queryParam.length).join(' ')}&`;
	} else if (queryParam[0] == '~') {
		//The default behaviour
		return `${key}=startsWith:${queryParam
			.slice(1, queryParam.length)
			.join(' ')}&`;
	} else {
		//The default behaviour
		return `${key}=startsWith:${queryParam
			.slice(0, queryParam.length)
			.join(' ')}&`;
	}
};

export const decodeFilterString = (filterString: string) => {
	const queryParam = filterString.split(':');
	if (queryParam[0] == 'equals') {
		return `= ${queryParam[1]}`;
	} else {
		//The default behaviour
		return `~ ${queryParam[1]}`;
	}
};

export const createQueryString = (data: { [key: string]: string }) => {
	// Construct the query params according to the filter texts, do not apply params if input is empty or ''
	let queryString = '?';

	Object.entries(data).forEach((entry) => {
		if (entry[1] != '') queryString += encodeFilterString(entry[0], entry[1]);
	});

	return queryString.slice(0, -1);
};
