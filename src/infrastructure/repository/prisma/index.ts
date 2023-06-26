import { PrismaClient } from "@prisma/client";
import { makeTagRepository } from "./TagRepository";
import { makeTransactionRepository } from "./TransactionRepository";

export interface IRepository<T> {
  create: (data: T) => Promise<T>;
  remove: (id: string) => Promise<boolean>;
  findAll: () => Promise<T[]>;
  findById: (id: string) => Promise<T | null>;
  update: (id: string, data: T) => Promise<T | null>;
}

export const prisma = new PrismaClient();

const tagRepository = makeTagRepository();
const transactionRepository = makeTransactionRepository();

export { tagRepository, transactionRepository };
