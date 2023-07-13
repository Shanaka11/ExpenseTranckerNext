import { PrismaClient } from '@prisma/client';
import { makeTagRepository } from './TagRepository';
import { makeTransactionRepository } from './TransactionRepository';

export const tagRepository = makeTagRepository();
export const transactionRepository = makeTransactionRepository();
