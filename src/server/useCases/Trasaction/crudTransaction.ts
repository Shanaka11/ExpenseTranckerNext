import { QueryOptions } from '@/infrastructure/repository/prisma';
import { Tag } from '@/server/models/Tag';
import {
	RawTransaction as ClientTransaction,
	Transaction,
	makeCreateTransaction,
} from '@/server/models/Transaction';

type TransactionRepository = {
	create: (data: Transaction) => Promise<
		Transaction & {
			tags: Tag[];
		}
	>;
	remove: (id: string) => Promise<boolean>;
	findAll: (options: QueryOptions) => Promise<
		(Transaction & {
			tags: Tag[];
		})[]
	>;
	findById: (id: string) => Promise<Transaction | null>;
	update: (
		id: string,
		data: Transaction
	) => Promise<
		Transaction & {
			tags: Tag[];
		}
	>;
};

type MakeCreateTransactionUseCase = {
	transactionRepository: TransactionRepository;
	tagRepository: { findById: (id: string) => Promise<Tag | null> };
	generateId: () => string;
	validateModel: (data: any) => void;
};

type MakeRetrieveTransactionUseCase = {
	transactionRepository: TransactionRepository;
};

type MakeUpdateTransactionUseCase = {
	transactionRepository: TransactionRepository;
	generateId: () => string;
	validateModel: (data: any) => void;
};

type MakeRemoveTransactionUseCase = {
	transactionRepository: TransactionRepository;
};

type createTransactionInput = {
	date: string;
	description: string;
	amount: number;
	tags: string[];
	user: string;
};

export const makeCreateTransactionUseCase = ({
	transactionRepository,
	tagRepository,
	generateId,
	validateModel,
}: MakeCreateTransactionUseCase) => {
	console.log('Make Create Tranasction Usecase');
	const createTransaction = makeCreateTransaction({
		generateId,
		validateModel,
	});

	const create = async (data: createTransactionInput) => {
		try {
			const rawTransaction = {
				id: '',
				date: data.date,
				description: data.description,
				amount: data.amount,
				user: data.user,
			};
			// First get the tag ids and then get the associated tags from the database
			const tags = await Promise.all(
				data.tags.map(async (tagId) => {
					const tag = await tagRepository.findById(tagId);
					if (tag) return tag;
					throw new Error('Tag does not exist');
				})
			);

			// Then create it
			if (tags === null) return;

			const transaction = createTransaction({
				...rawTransaction,
				tags: tags,
			});
			const response = await transactionRepository.create(transaction);
			return response;
		} catch (e) {
			throw e;
		}
	};

	return create;
};

export const makeRetrieveTransactionUseCase = ({
	transactionRepository,
}: MakeRetrieveTransactionUseCase) => {
	console.log('Make Retrieve Tranasction Usecase');
	const retrieve = async ({
		id,
		count,
		where,
	}: {
		id?: string;
		count?: number;
		where?: any;
	}) => {
		try {
			if (id) {
				const response = await transactionRepository.findById(id);
				return response;
			}
			const response = await transactionRepository.findAll({
				where: where,
				count: count,
			});
			return response;
		} catch (e) {
			console.log(e);
			throw e;
		}
	};

	return retrieve;
};

export const makeUpdateTransactionUseCase = ({
	transactionRepository,
	generateId,
	validateModel,
}: MakeUpdateTransactionUseCase) => {
	const createTransaction = makeCreateTransaction({
		generateId,
		validateModel,
	});

	const update = async (id: string, data: ClientTransaction) => {
		// Update the Transaction using the repository method
		try {
			const transaction = createTransaction({ ...data, id });
			const response = await transactionRepository.update(id, transaction);
			return response;
		} catch (e) {
			throw e;
		}
	};

	return update;
};

export const makeRemoveTransactionUseCase = ({
	transactionRepository,
}: MakeRemoveTransactionUseCase) => {
	const remove = async (id: string) => {
		// Remove the tag using the repository method
		try {
			const response = await transactionRepository.remove(id);
			return response;
		} catch (e) {
			throw e;
		}
	};

	return remove;
};
