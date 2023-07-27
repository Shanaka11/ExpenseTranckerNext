import {
	transactionRepository,
	tagRepository,
} from '@/infrastructure/repository/prisma';
import { validateModel as zodValidateModel } from '@/infrastructure/validation/ValidateModel';
import { generateId } from '.';
import { makeCreateTransactionUseCase } from './Trasaction/crudTransaction';
import { TransactionScehma } from '@/infrastructure/validation/TransactionValidationSchemas';

const validateModel = (data: any) => {
	zodValidateModel(TransactionScehma, data);
};

export const createTransaction = makeCreateTransactionUseCase({
	transactionRepository: transactionRepository,
	tagRepository: tagRepository,
	generateId: generateId,
	validateModel: validateModel,
});
