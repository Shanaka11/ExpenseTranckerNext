import { Transaction } from '@/server/models/Transaction';

export const createSummary = (transactions?: Transaction[]) => {
	const summary = {
		totalExpense: 0,
		totalIncome: 0,
		totalBalance: 0,
	};

	transactions?.map((transaction) => {
		if (transaction.amount >= 0) {
			summary.totalIncome += transaction.amount;
			summary.totalBalance += transaction.amount;
		} else {
			summary.totalExpense += transaction.amount;
			summary.totalBalance += transaction.amount;
		}
	});

	summary.totalExpense = summary.totalExpense * -1;
	return summary;
};
