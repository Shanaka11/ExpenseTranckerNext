import { tagRepository, transactionRepository } from './Repository';

export interface IRepository<T> {
	create: (data: T) => Promise<T>;
	remove: (id: string) => Promise<boolean>;
	findAll: () => Promise<T[]>;
	findById: (id: string) => Promise<T | null>;
	update: (id: string, data: T) => Promise<T | null>;
}

export { tagRepository, transactionRepository };
