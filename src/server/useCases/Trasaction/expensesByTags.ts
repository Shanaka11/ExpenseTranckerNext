import { transactionRepository } from '@/infrastructure/repository/prisma';
import { expenseByTags } from '@/infrastructure/repository/prisma/TransactionRepository';

const getExpensesByTags = async (userId: string) => {
	try {
		const response = await expenseByTags(userId);
		return response;
	} catch (e) {
		throw e;
	}
};

export default getExpensesByTags;
