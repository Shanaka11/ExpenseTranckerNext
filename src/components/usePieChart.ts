import { useMemo } from 'react';

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

export const usePieChart = (data: { tag: string; amount: number }[]) => {
	const chartData = useMemo(() => mapToChartData(data), [data]);

	return {
		chartData,
	};
};
