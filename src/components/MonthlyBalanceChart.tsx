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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
	},
};

type MonthlyBalanceChartProps = {
	summary: { month: string; amount: number }[];
};

const MonthlyBalanceChart: React.FC<MonthlyBalanceChartProps> = ({
	summary,
}) => {
	const { chartData } = useBarChart(summary);

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
