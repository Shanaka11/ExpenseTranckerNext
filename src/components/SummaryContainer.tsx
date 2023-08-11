'use client';
import React, { useMemo } from 'react';
import Card from './Card';

type SummaryContainerProps = {
	income: number;
	expense: number;
	totalAmount: number;
};

const SummaryContainer: React.FC<SummaryContainerProps> = ({
	income,
	expense,
	totalAmount,
}) => {
	return (
		<>
			{/* Balance */}
			<Card title='Balance' value={totalAmount} />
			{/* Income */}
			<Card title='Income' value={income} />
			{/* Expense */}
			<Card title='Expense' value={expense} />
		</>
	);
};

export default SummaryContainer;
