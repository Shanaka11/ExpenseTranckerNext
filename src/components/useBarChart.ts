import { useMemo } from 'react';

const mapToChartData = (inputData: { month: string; amount: number }[]) => {
	const labels: string[] = [];
	const data: number[] = [];

	inputData.forEach((inputDataItem) => {
		labels.push(inputDataItem.month);
		data.push(inputDataItem.amount);
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

export const useBarChart = (data: { month: string; amount: number }[]) => {
	const chartData = useMemo(() => mapToChartData(data), [data]);

	return {
		chartData,
	};
};
