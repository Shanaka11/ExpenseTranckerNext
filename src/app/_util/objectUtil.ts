import { SearchParams } from '@/ServerServices/SearchParamType';

export const isEmptyObject = (obj: SearchParams) => {
	return Object.keys(obj).length === 0;
};
