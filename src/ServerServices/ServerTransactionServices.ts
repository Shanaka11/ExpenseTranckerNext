import { retrieveTransaction } from '@/server/useCases/RetrieveTransaction';
import getExpensesByTags from '@/server/useCases/Trasaction/expensesByTags';
import { auth } from '@clerk/nextjs';
import { SearchParams } from './SearchParamType';
import { generateTransactionFilter } from '@/infrastructure/filters/prisma/TransactionFilter';

type TransactionServiceInput = {
	count?: number;
	searchParams?: SearchParams;
};

export const getTransactionsService = async (
	filters?: TransactionServiceInput
) => {
	try {
		const { userId } = auth();
		if (userId === null)
			throw new Error('You must be logged in to access this page');

		const where = generateTransactionFilter({
			...filters?.searchParams,
			user: userId,
		});

		const res = await retrieveTransaction({
			count: filters?.count,
			where,
		});
		if (res === null) return undefined;
		if (Array.isArray(res)) return res;
		return [res];
	} catch (e: any) {
		throw new Error(
			'Error, unable to fetch data from the server, Try refreshing or contact customer support if the issue persists'
		);
	}
};

export const getTransactionSummary = async (
	filters?: TransactionServiceInput
) => {
	try {
		const { userId } = auth();
		if (userId === null)
			throw new Error('You must be logged in to view this content');
		const res = await getExpensesByTags(userId);
		return res;
	} catch (e) {
		throw new Error(
			'Error, unable to fetch data from the server, Try refreshing or contact customer support if the issue persists'
		);
	}
};
