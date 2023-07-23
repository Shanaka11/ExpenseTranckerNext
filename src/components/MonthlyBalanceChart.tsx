'use client';
import React from 'react';
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
	labels,
	datasets: [
		{
			label: 'Balance',
			data: [120000, 100000, -200000, 123410, 50000, -10000, 100000],
			backgroundColor: '#60a5fa',
		},
	],
};

const MonthlyBalanceChart = () => {
	return (
		<>
			<h1 className='font-extrabold'>Monthly Balance</h1>
			<div className='ml-auto mr-auto grid h-full max-w-full items-center'>
				<Bar options={options} data={data} />
			</div>
		</>
	);
};

export default MonthlyBalanceChart;
