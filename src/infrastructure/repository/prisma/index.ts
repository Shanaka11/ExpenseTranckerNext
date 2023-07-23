import { tagRepository, transactionRepository } from './Repository';

export type QueryOptions = {
	where?: any;
	count?: number;
};
export interface IRepository<ClientModel, ServerModel> {
	create: (data: ClientModel) => Promise<ServerModel>;
	remove: (id: string) => Promise<boolean>;
	findAll: (options?: QueryOptions) => Promise<ServerModel[]>;
	findById: (id: string) => Promise<ServerModel | null>;
	update: (id: string, data: ClientModel) => Promise<ServerModel | null>;
}

export { tagRepository, transactionRepository };
