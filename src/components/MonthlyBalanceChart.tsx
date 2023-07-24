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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const options = {
	responsive: true,
	plugins: {
		// title: {
		// 	display: true,
		// 	text: 'Chart.js Bar Chart',
		// },
	},
};

type MonthlyBalanceChartProps = {
	summary: { month: string; amount: number }[];
};

const mapToChartData = (summary: { month: string; amount: number }[]) => {
	const labels: string[] = [];
	const data: number[] = [];

	summary.forEach((summaryItem) => {
		labels.push(summaryItem.month);
		data.push(summaryItem.amount);
	});

	return {
		labels,
		datasets: [
			{
				data,
				backgroundColor: '#60a5fa',
			},
		],
	};
};

const MonthlyBalanceChart: React.FC<MonthlyBalanceChartProps> = ({
	summary,
}) => {
	const chartData = useMemo(() => mapToChartData(summary), [summary]);

	return (
		<>
			<h1 className='font-extrabold'>Monthly Balance</h1>
			<div className='ml-auto mr-auto grid h-full max-w-full items-center'>
				<Bar options={options} data={chartData} />
			</div>
		</>
	);
};

export default MonthlyBalanceChart;
