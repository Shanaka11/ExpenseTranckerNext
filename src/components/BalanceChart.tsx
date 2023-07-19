'use client';
import { Transaction } from '@/server/models/Transaction';
import React, { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type BalanceChartProps = {
	transactions: Transaction[];
};

const createGraphData = (transactions: Transaction[]) => {
	const graphData = new Map();
	let rollingBalance = 0;
	const endDate = new Date();
	const startDate = new Date();
	// startDate.setFullYear(startDate.getFullYear() - 1);
	startDate.setMonth(startDate.getMonth() - 3);
	// startDate.se(startDate.getDate() - 5);
	// Start Date should go back at least a year
	// while (startDate <= endDate) {
	// 	// Create the date map
	// 	if (!graphData.has(startDate.toDateString())) {
	// 		graphData.set(startDate.toDateString(), {
	// 			name: startDate.toDateString,
	// 			amount: 0,
	// 		});
	// 	}
	// 	startDate.setDate(startDate.getDate() + 1);
	// }
	// Go through the transactions and update balance of the data map
	transactions
		.slice()
		.reverse()
		.forEach((transaction) => {
			const date = new Date(transaction.date).toDateString();
			rollingBalance += transaction.amount;
			if (graphData.has(date)) {
				const graphDataItem = graphData.get(date);
				graphDataItem.amount = rollingBalance;
				graphData.set(date, graphDataItem);
			} else {
				graphData.set(date, {
					name: date,
					amount: rollingBalance,
				});
			}
		});

	// console.log(graphData);

	return Array.from(graphData, (item) => {
		return { name: item[0], amount: item[1].amount };
	});
};

const BalanceChart: React.FC<BalanceChartProps> = ({ transactions }) => {
	const chartData = useMemo(
		() => createGraphData(transactions),
		[transactions]
	);

	return (
		<LineChart width={400} height={400} data={chartData}>
			<Line type='monotone' dataKey='amount' stroke='#82ca9d' />
			<XAxis />
			<YAxis />
		</LineChart>
	);
};

export default BalanceChart;
