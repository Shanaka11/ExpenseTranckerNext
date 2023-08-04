'use client';
import React, { useMemo } from 'react';
import Card from './Card';
import { Transaction } from '@prisma/client';

type SummaryContainerProps = {
	transactions?: Transaction[];
};

const createSummary = (transactions?: Transaction[]) => {
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

const SummaryContainer: React.FC<SummaryContainerProps> = ({
	transactions,
}) => {
	const summary = useMemo(() => createSummary(transactions), [transactions]);

	return (
		<>
			{/* Balance */}
			<Card title='Balance' value={summary.totalBalance} />
			{/* Income */}
			<Card title='Income' value={summary.totalIncome} />
			{/* Expense */}
			<Card title='Expense' value={summary.totalExpense} />
		</>
	);
};

export default SummaryContainer;
