'use client';
import React, { useMemo } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useBarChart } from './useBarChart';
import { Transaction } from '@/server/models/Transaction';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
	},
};

const generateMonthlyExpenseHistory = (transactions?: Transaction[]) => {
	const transactionByDateMap = new Map<string, number>();

	transactions?.forEach((transaction) => {
		if (transaction.amount < 0) {
			const mapKey = transaction.date.toISOString().slice(5, 10);
			const mapItem = transactionByDateMap.get(mapKey);
			if (mapItem !== undefined) {
				transactionByDateMap.set(mapKey, mapItem - transaction.amount);
			} else {
				transactionByDateMap.set(mapKey, -1 * transaction.amount);
			}
		}
	});

	const retMap: { month: string; amount: number }[] = [];

	transactionByDateMap.forEach((value, key) => {
		retMap.push({
			month: key,
			amount: value,
		});
	});

	retMap.sort((a, b) => {
		if (a.month > b.month) return 1;
		if (a.month < b.month) return -1;
		return 0;
	});

	return retMap;
};

type HistoryChartProps = {
	transactions: Transaction[];
};

const HistoryChart: React.FC<HistoryChartProps> = ({ transactions }) => {
	const baseChartData = useMemo(
		() => generateMonthlyExpenseHistory(transactions),
		[transactions]
	);
	const { chartData } = useBarChart(baseChartData);

	return (
		<>
			<h1 className='font-extrabold'>Expense History</h1>
			<div className='grid h-full items-center'>
				<Bar options={options} data={chartData} />
			</div>
		</>
	);
};

export default HistoryChart;
