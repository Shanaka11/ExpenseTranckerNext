import { tagApi, transactionApi } from '@/server/useCases';
import { auth } from '@clerk/nextjs';
import { Tag } from '@prisma/client';

type ServerServiceArgs = {
	userId?: string;
	count?: number;
};

export const getTagsService: (
	args: ServerServiceArgs
) => Promise<Tag[] | undefined> = async ({ count, userId }) => {
	try {
		const res = await tagApi.retrieve();

		if (res === null) return undefined;
		if (Array.isArray(res)) return res;
		return [res];
	} catch (e: any) {
		console.log(e);
		throw new Error(
			'Error, unable to fetch data from the server, Try refreshing or contact customer support if the issue persists'
		);
	}
};
