import { transactionRepository } from '@/infrastructure/repository/prisma';
import { generateId } from '.';
import { makeUpdateTransactionUseCase } from './Trasaction/crudTransaction';
import { TransactionScehma } from '@/infrastructure/validation/TransactionValidationSchemas';
import { validateModel as zodValidateModel } from '@/infrastructure/validation/ValidateModel';

const validateModel = (data: any) => {
	zodValidateModel(TransactionScehma, data);
};

export const updateTransaction = makeUpdateTransactionUseCase({
	transactionRepository,
	generateId,
	validateModel,
});
