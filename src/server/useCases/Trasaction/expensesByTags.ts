import { transactionRepository } from '@/infrastructure/repository/prisma';

const getExpensesByTags = async (userId: string) => {
	try {
		const tagSum = new Map<string, number>();
		var totalAmount = 0;
		var addedTotal = 0;
		var otherAmount = 0;
		const retArray: { tag: string; amount: number }[] = [];

		const transactions = await transactionRepository.findAll({
			where: {
				user: userId,
				amount: {
					lt: 0,
				},
			},
		});

		// Get the summary by tags
		transactions.forEach((transaction) => {
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
		});

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

		// Create a monthly summary as well and return it (summary should only be for the past 6 month including the current one)
		return retArray;

		// const response = await expenseByTags(userId);
		// return response;
	} catch (e) {
		throw e;
	}
};

export default getExpensesByTags;
