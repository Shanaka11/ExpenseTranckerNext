'use client';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { usePieChart } from './usePieChart';

ChartJS.register(ArcElement, Tooltip);

type ExpenseDistributionChartProps = {
	summary: { tag: string; amount: number }[];
};

const ExpenseDistributionChart: React.FC<ExpenseDistributionChartProps> = ({
	summary,
}) => {
	const { chartData } = usePieChart(summary);
	return (
		<>
			<h1 className='font-extrabold'>Expense Distribution</h1>
			<div className='ml-auto mr-auto grid h-full max-w-[470px] items-center'>
				<Pie
					data={chartData}
					options={{
						plugins: {
							legend: {
								display: false,
							},
						},
					}}
				/>
			</div>
		</>
	);
};

export default ExpenseDistributionChart;
