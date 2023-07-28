import { SearchParams } from '@/ServerServices/SearchParamType';
import { createQueryString, decodeFilterString } from '@/filterUtil';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type BaseObjectType = {
	[key: string]: string;
};

const convertSearchParamsToFilters = (searchParams: SearchParams) => {
	const objectType: BaseObjectType = {};
	for (const key in searchParams) {
		const value = searchParams[key];
		if (typeof value === 'string') {
			objectType[key] = decodeFilterString(value);
		} else if (Array.isArray(value)) {
			objectType[key] = value.join(',');
		}
	}
	return objectType;
};
// We need the base URL tag/ , transaction/ etc
const useFilter = (baseUrl: string, defaultValues: SearchParams) => {
	const router = useRouter();
	const [activeFilters, setActiveFilters] = useState<BaseObjectType>(
		convertSearchParamsToFilters(defaultValues)
	);

	const handleApplyFilter = (queryFilters: BaseObjectType) => {
		const queryString = createQueryString(queryFilters);
		router.push(`${baseUrl}/${queryString}`);
	};

	const handleRemoveFilter = (key: string) => {
		setActiveFilters((prevValue) => {
			return {
				...prevValue,
				[key]: '',
			};
		});
		handleApplyFilter({
			...activeFilters,
			[key]: '',
		});
	};

	return {
		activeFilters,
		handleApplyFilter,
		handleRemoveFilter,
	};
};

export default useFilter;
