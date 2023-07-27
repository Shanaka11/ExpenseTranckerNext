import { transactionRepository } from '@/infrastructure/repository/prisma';
import { makeRemoveTransactionUseCase } from './Trasaction/crudTransaction';

export const removeTransaction = makeRemoveTransactionUseCase({
	transactionRepository,
});
