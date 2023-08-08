'use client';
import React, { useMemo } from 'react';
import Card from './Card';
import { Transaction } from '@prisma/client';
import { createSummary } from '@/app/_util/calculateSummar';

type SummaryContainerProps = {
	transactions?: Transaction[];
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
