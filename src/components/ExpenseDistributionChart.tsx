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

// const data = {
// 	labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // Tags
// 	datasets: [
// 		{
// 			data: [12, 19, 3, 5, 2, 3], // Data
// 			// backgroundColor: [
// 			// 	'rgba(255, 99, 132, 1)',
// 			// 	'rgba(54, 162, 235, 1)',
// 			// 	'rgba(255, 206, 86, 1)',
// 			// 	'rgba(75, 192, 192, 1)',
// 			// 	'rgba(153, 102, 255, 1)',
// 			// 	'rgba(255, 159, 64, 1)', // Color
// 			// ],
// 			// borderColor: [
// 			// 	'rgba(255, 99, 132, 1)',
// 			// 	'rgba(54, 162, 235, 1)',
// 			// 	'rgba(255, 206, 86, 1)',
// 			// 	'rgba(75, 192, 192, 1)',
// 			// 	'rgba(153, 102, 255, 1)',
// 			// 	'rgba(255, 159, 64, 1)',
// 			// ],
// 			borderWidth: 1,
// 		},
// 	],
// };

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
