import { IMakeCreateModel } from './IMakeCreateModel';

export type Tag = {
	id: string;
	name: string;
	user: string;
};

export const makeCreateTag = ({
	validateModel,
	generateId,
}: IMakeCreateModel) => {
	return (data: Tag) => {
		if (!data.id) data.id = generateId();
		data.name = data.name.toLowerCase();
		validateModel(data);
		return {
			...data,
			id: data.id,
		};
	};
};
