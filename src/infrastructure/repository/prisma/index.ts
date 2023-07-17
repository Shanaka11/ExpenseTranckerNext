import { tagRepository, transactionRepository } from './Repository';

export interface IRepository<ClientModel, ServerModel> {
	create: (data: ClientModel) => Promise<ServerModel>;
	remove: (id: string) => Promise<boolean>;
	findAll: () => Promise<ServerModel[]>;
	findById: (id: string) => Promise<ServerModel | null>;
	update: (id: string, data: ClientModel) => Promise<ServerModel | null>;
}

export { tagRepository, transactionRepository };
