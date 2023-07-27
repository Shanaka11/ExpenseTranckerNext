import { transactionRepository } from '@/infrastructure/repository/prisma';
import { makeRetrieveTransactionUseCase } from './Trasaction/crudTransaction';

export const retrieveTransaction = makeRetrieveTransactionUseCase({
	transactionRepository,
});
