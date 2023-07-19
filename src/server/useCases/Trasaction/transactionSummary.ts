import { IRepository } from '@/infrastructure/repository/prisma';
import { Transaction } from '@prisma/client';
import { Transaction as ClientTransaction } from '@/server/models/Transaction';

export const makeTransactionSummaryUseCase = ({}: {
	transactionRepository: IRepository<ClientTransaction, Transaction>;
}) => {
	// When given a date return summary of transaction amounts for the current month of the date, previous 3 / 6 months and alltime data
	// Return balance, expense, income
	const getTransactionSummary = (date: Date) => {};
};
