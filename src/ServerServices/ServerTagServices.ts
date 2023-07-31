import { auth } from '@clerk/nextjs';
import { Tag } from '@prisma/client';
import { SearchParams } from './SearchParamType';
import { generateTagFilter } from '@/infrastructure/filters/prisma/TagFilter';
import { retrieveTag } from '@/server/useCases/RetrieveTag';
import { cache } from 'react';

type ServerServiceArgs = {
	count?: number;
	searchParams?: SearchParams;
};

export const getTagsService: (
	args: ServerServiceArgs
) => Promise<Tag[] | undefined> = cache(async ({ count, searchParams }) => {
	try {
		const where = generateTagFilter(searchParams);
		const res = await retrieveTag({
			where,
			count,
		});

		if (res === null) return undefined;
		if (Array.isArray(res)) return res;
		return [res];
	} catch (e: any) {
		console.log(e);
		throw new Error(
			'Error, unable to fetch data from the server, Try refreshing or contact customer support if the issue persists'
		);
	}
});
