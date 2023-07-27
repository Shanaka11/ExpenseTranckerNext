import { IMakeCreateModel } from './IMakeCreateModel';
import { Tag } from './Tag';

export type Transaction = {
	id: string;
	date: Date;
	description: string;
	amount: number;
	tags?: Tag[];
	user: string;
};

export type RawTransaction = {
	id: string;
	date: string;
	description: string;
	amount: number;
	tags?: Tag[];
	user: string;
};

export const makeCreateTransaction = ({
	validateModel,
	generateId,
}: IMakeCreateModel) => {
	return (data: RawTransaction) => {
		if (!data.id || data.id === '') data.id = generateId();
		validateModel(data);
		const transaction: Transaction = {
			...data,
			date: new Date(data.date),
			id: data.id,
		};
		return transaction;
	};
};
