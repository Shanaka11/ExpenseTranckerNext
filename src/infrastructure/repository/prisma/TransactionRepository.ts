import { Transaction } from '@/server/models/Transaction';
import { prisma } from './PrismaSingleton';
import { QueryOptions } from '.';

export const makeTransactionRepository = () => {
	const create = async (data: Transaction) => {
		const prismaData = {
			...data,
			tags: {
				connect: data.tags?.map((tag) => {
					return { id: tag.id };
				}),
			},
		};

		const created = await prisma.transaction.create({
			data: prismaData,
			include: {
				tags: true,
			},
		});
		return created;
	};

	const findById = async (id: string) => {
		const found = await prisma.transaction.findUnique({
			where: { id },
			include: {
				tags: true,
			},
		});
		return found || null;
	};

	const findAll = async (options: QueryOptions) => {
		const all = await prisma.transaction.findMany({
			include: {
				tags: true,
			},
			where: {
				user: options?.userId,
			},
			orderBy: {
				date: 'desc',
			},
			take: options?.count,
		});
		return all;
	};

	const update = async (id: string, data: Transaction) => {
		const prismaData = {
			...data,
			tags: {
				set: [],
				connect: data.tags?.map((tag) => {
					return { id: tag.id };
				}),
			},
		};
		const updated = await prisma.transaction.update({
			where: { id },
			data: prismaData,
			include: {
				tags: true,
			},
		});
		return updated || null;
	};

	const remove = async (id: string): Promise<boolean> => {
		await prisma.transaction.delete({ where: { id } });
		return true;
	};

	return {
		create,
		remove,
		findAll,
		findById,
		update,
	};
};

export const expenseByTags = async (userId: string) => {
	// Ideally this should only handle the data fetching from db i.e Fet all transactions that has an amount < 0 and the matching user Id, rest of the logic should be in usecase
	const tagSum = new Map<string, number>();
	var totalAmount = 0;
	var addedTotal = 0;
	var otherAmount = 0;
	const retArray: { tag: string; amount: number }[] = [];

	const transactions = await prisma.transaction.findMany({
		where: {
			amount: {
				lt: 0,
			},
			user: userId,
		},
		include: {
			tags: true,
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

	// Sort the map
	const sortedTagSum = Array.from(tagSum);
	sortedTagSum.sort((a, b) => b[1] - a[1]);

	sortedTagSum.forEach((item) => {
		const value = item[1];
		console.log(
			((totalAmount - addedTotal) * 100) / totalAmount,
			addedTotal,
			totalAmount
		);
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

	return retArray;
};
