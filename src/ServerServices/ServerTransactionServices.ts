import { auth } from '@clerk/nextjs';

type TransactionServiceInput = {
	count?: number;
};

const createQueryString = (filters?: TransactionServiceInput) => {
	if (filters?.count !== undefined) return `?count=${filters.count}`;

	return '';
};

export const getTransactionsService = async (
	filters?: TransactionServiceInput
) => {
	const { getToken } = auth();
	const token = await getToken();

	const res = await fetch(
		`http://localhost:3000/api/transaction${createQueryString(filters)}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!res.ok) {
		throw new Error(
			'Error, unable to fetch data from the server, Try refreshing or contact customer support if the issue persists'
		);
	}
	// const test = await res.json();
	return await res.json();
};
