import { transactionRepository } from '@/infrastructure/repository/prisma';

const monthLabels = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'Novemeber',
	'December',
];

const isLessThanMonths = (
	currentDate: Date,
	dataDate: Date,
	months: number
) => {
	const monthDiff =
		(currentDate.getFullYear() - dataDate.getFullYear()) * 12 +
		currentDate.getMonth() -
		dataDate.getMonth();
	return Math.abs(monthDiff) <= months;
};

const getExpensesByTags = async (userId: string) => {
	try {
		const tagSum = new Map<string, number>();
		const monthSumMap = new Map<number, number>();
		var totalAmount = 0;
		var addedTotal = 0;
		var otherAmount = 0;
		var incomeSummary = 0;
		var expenseSummary = 0;
		const retArray: { tag: string; amount: number }[] = [];
		const monthSummary: { month: string; amount: number }[] = [];
		const today = new Date();

		const transactions = await transactionRepository.findAll({
			where: {
				user: userId,
			},
		});

		// Get the summary by tags
		transactions.forEach((transaction) => {
			// If the date is less than 6 months from the current date then add to the month summary
			if (isLessThanMonths(today, transaction.date, 6)) {
				const month = transaction.date.getMonth();
				let monthSummaryItem = monthSumMap.get(month);
				if (monthSummaryItem !== undefined) {
					monthSummaryItem += transaction.amount;
					monthSumMap.set(month, monthSummaryItem);
				} else {
					monthSumMap.set(month, transaction.amount);
				}
			}
			if (transaction.amount < 0) {
				// Expense summary should only be calculated for amounts that are less than zero
				transaction.tags.forEach((tag) => {
					totalAmount -= transaction.amount;
					if (tagSum.has(tag.name)) {
						let tagSumItem = tagSum.get(tag.name);
						tagSumItem =
							tagSumItem === undefined
								? -transaction.amount
								: tagSumItem - transaction.amount;
						tagSum.set(tag.name, tagSumItem);
					} else {
						tagSum.set(tag.name, -transaction.amount);
					}
				});
			}
			// Calculate total Summary
			if (transaction.amount > 0) {
				incomeSummary += transaction.amount;
			} else {
				expenseSummary += transaction.amount;
			}
		});

		// Calculate Monthly Summary
		// Create a monthly summary as well and return it (summary should only be for the past 6 month including the current one)
		// Sort the map according to the months
		const sortedMonthlySum = Array.from(monthSumMap);
		sortedMonthlySum.sort();

		sortedMonthlySum.forEach((item) => {
			monthSummary.push({
				month: monthLabels[item[0]],
				amount: item[1],
			});
		});

		// Calcualte Tag summary
		const sortedTagSum = Array.from(tagSum);
		sortedTagSum.sort((a, b) => b[1] - a[1]);

		sortedTagSum.forEach((item) => {
			const value = item[1];
			if (((totalAmount - addedTotal) * 100) / totalAmount >= 20) {
				retArray.push({
					tag: item[0],
					amount: value,
				});
			} else {
				otherAmount += value;
			}
			addedTotal += value;
		});

		if (otherAmount > 0) {
			retArray.push({
				tag: 'Other',
				amount: otherAmount,
			});
		}

		return {
			tag: retArray,
			month: monthSummary,
			summary: {
				income: incomeSummary,
				expense: -1 * expenseSummary,
				totalAmount: incomeSummary + expenseSummary,
			},
			recentTransactions: transactions.slice(0, 4),
		};
	} catch (e) {
		throw e;
	}
};

export default getExpensesByTags;
