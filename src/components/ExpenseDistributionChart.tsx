'use client';
import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);
const chartColorKey = [
	'#eab308',
	'#84cc16',
	'#4ade80',
	'#2dd4bf',
	'#22d3ee',
	'#0ea5e9',
	'#a78bfa',
	'#d946ef',
	'#1d4ed8',
	'#f43f5e',
];

type ExpenseDistributionChartProps = {
	summary: { tag: string; amount: number }[];
};

const mapToChartData = (summary: { tag: string; amount: number }[]) => {
	const labels: string[] = [];
	const data: number[] = [];
	summary.forEach((summaryItem) => {
		labels.push(summaryItem.tag);
		data.push(summaryItem.amount);
	});

	return {
		labels,
		datasets: [
			{
				data,
				backgroundColor: chartColorKey,
			},
		],
	};
};

const ExpenseDistributionChart: React.FC<ExpenseDistributionChartProps> = ({
	summary,
}) => {
	const chartData = useMemo(() => mapToChartData(summary), [summary]);
	return (
		<>
			<h1 className='font-extrabold'>Expense Distribution</h1>
			<div className='ml-auto mr-auto grid h-full max-w-[470px] items-center'>
				<Pie data={chartData} />
			</div>
		</>
	);
};

export default ExpenseDistributionChart;
