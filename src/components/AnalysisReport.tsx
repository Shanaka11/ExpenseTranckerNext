'use client';
import { Transaction } from '@/server/models/Transaction';
import React, { Fragment, useMemo } from 'react';
import TransactionTable from './TransactionTable';
import ExpenseDistributionChart from './ExpenseDistributionChart';
import HistoryChart from './HistoryChart';

type AnalysisReportProps = {
	transactions?: Transaction[];
};

export const generateReportData = (transactions?: Transaction[]) => {
	const summary = {
		totalExpense: 0,
		totalIncome: 0,
		totalBalance: 0,
	};

	const charDataMap = new Map<string, number>();
	const topIncome: Transaction[] = [];
	const topExpense: Transaction[] = [];

	transactions?.sort((a, b) => {
		return a.amount - b.amount;
	});

	transactions?.map((transaction) => {
		if (transaction.amount >= 0) {
			// Income
			summary.totalIncome += transaction.amount;
			summary.totalBalance += transaction.amount;
			if (topIncome.length < 5) {
				topIncome.push(transaction);
			}
		} else {
			// Expense
			summary.totalExpense += transaction.amount;
			summary.totalBalance += transaction.amount;
			if (topExpense.length < 5) {
				topExpense.push(transaction);
			}
			transaction.tags?.map((tag) => {
				const chartDataItem = charDataMap.get(tag.name);
				if (chartDataItem !== undefined) {
					charDataMap.set(tag.name, chartDataItem - transaction.amount);
				} else {
					charDataMap.set(tag.name, transaction.amount * -1);
				}
			});
		}
	});

	const chartData: { tag: string; amount: number }[] = [];

	charDataMap?.forEach((value, key) => {
		chartData.push({
			tag: key,
			amount: value,
		});
	});

	summary.totalExpense = summary.totalExpense * -1;

	return {
		summary,
		topIncome,
		topExpense,
		chartData,
	};
};

const AnalysisReport: React.FC<AnalysisReportProps> = ({ transactions }) => {
	const report = useMemo(
		() => generateReportData(transactions),
		[transactions]
	);

	return (
		<div className='mt-4 grid grid-cols-12 gap-4'>
			<div className='col-span-12 flex h-28 w-full flex-col rounded-lg bg-white px-4 py-2 drop-shadow-md sm:col-span-4'>
				<h2 className='font-extrabold'>Balance</h2>
				<p className='mb-auto mt-auto text-center text-lg'>
					{report.summary.totalBalance.toLocaleString(undefined, {
						maximumFractionDigits: 2,
						minimumFractionDigits: 2,
					})}
				</p>
			</div>
			<div className='col-span-12 flex h-28 w-full flex-col rounded-lg bg-white px-4 py-2 drop-shadow-md sm:col-span-4'>
				<h2 className='font-extrabold'>Income</h2>
				<p className='mb-auto mt-auto text-center text-lg'>
					{report.summary.totalIncome.toLocaleString(undefined, {
						maximumFractionDigits: 2,
						minimumFractionDigits: 2,
					})}
				</p>
			</div>
			<div className='col-span-12 flex h-28 w-full flex-col rounded-lg bg-white px-4 py-2 drop-shadow-md sm:col-span-4'>
				<h2 className='font-extrabold'>Expense</h2>
				<p className='mb-auto mt-auto text-center text-lg'>
					{report.summary.totalExpense.toLocaleString(undefined, {
						maximumFractionDigits: 2,
						minimumFractionDigits: 2,
					})}
				</p>
			</div>
			<div className='col-span-12 flex h-full w-full flex-col rounded-lg bg-white px-4 py-2 drop-shadow-md sm:col-span-6'>
				<h2 className='mb-2 font-extrabold'>Top Incoming Transactions</h2>
				<TransactionTable
					transactions={report.topIncome}
					tags={[]}
					readonly={true}
					width='col-span-6'
				/>
			</div>
			<div className='col-span-12 flex h-fit w-full flex-col rounded-lg bg-white px-4 py-2 drop-shadow-md sm:col-span-6'>
				<h2 className='mb-2 font-extrabold'>Top Outgoing Transactions</h2>
				<TransactionTable
					transactions={report.topExpense}
					tags={[]}
					readonly={true}
					width='col-span-6'
				/>
			</div>
			<div className='col-span-12 flex h-full w-full flex-col rounded-lg bg-white px-4 py-2 drop-shadow-md md:col-span-6'>
				<ExpenseDistributionChart summary={report.chartData} />
			</div>
			<div className='col-span-12 flex h-full w-full flex-col rounded-lg bg-white px-4 py-2 drop-shadow-md md:col-span-6'>
				<HistoryChart transactions={transactions ?? []} />
			</div>
		</div>
	);
};

export default AnalysisReport;
