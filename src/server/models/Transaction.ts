import { IMakeCreateModel } from './IMakeCreateModel';
import { Tag } from './Tag';

export type Transaction = {
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
}: IMakeCreateModel<Transaction>) => {
	return (data: Transaction) => {
		if (!data.id || data.id === '') data.id = generateId();
		validateModel(data);
		return {
			...data,
			id: data.id,
		};
	};
};
