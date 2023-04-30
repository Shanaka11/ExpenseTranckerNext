import { Transaction } from "@/server/models/Transaction"
import { prisma } from ".";

export const makeTransactionRepository = () => {
    const create = async (data: Transaction) => {
        const created = await prisma.transaction.create({ data });
        return created
    }

    const findById = async (id: string) => {
        const found = await prisma.transaction.findUnique({ where: {id} })
        return found || null
    }
  
    const findAll = async () => {
        const all = await prisma.transaction.findMany();
        return all;
    }
  
    const update = async (id: string, data: Transaction) => {
        const updated = await prisma.transaction.update({ where: { id }, data });
        return updated || null;
    }
  
    const remove = async (id: string): Promise<boolean> => {
        await prisma.transaction.delete({ where: { id } });
        return true;
    }
    
    return {
        create,
        remove,
        findAll,
        findById,
        update
    }
}