import { Transaction } from "@/server/models/Transaction";
import { Transaction as PrismaTransaction } from "@prisma/client";
import { prisma } from ".";

export const makeTransactionRepository = () => {
  const create = async (data: Transaction) => {
    const prismaData = {
      ...data,
      tags: {
        connect: data.tags?.map((tag) => {
          return { id: tag.id };
        }),
      },
    };

    const created = await prisma.transaction.create({
      data: prismaData,
      include: {
        tags: true,
      },
    });

    return created;
  };

  const findById = async (id: string) => {
    const found = await prisma.transaction.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });
    return found || null;
  };

  const findAll = async () => {
    const all = await prisma.transaction.findMany({
      include: {
        tags: true,
      },
    });
    return all;
  };

  const update = async (id: string, data: Transaction) => {
    const prismaData = {
      ...data,
      tags: {
        set: [],
        connect: data.tags?.map((tag) => {
          return { id: tag.id };
        }),
      },
    };
    const updated = await prisma.transaction.update({
      where: { id },
      data: prismaData,
      include: {
        tags: true,
      },
    });
    return updated || null;
  };

  const remove = async (id: string): Promise<boolean> => {
    await prisma.transaction.delete({ where: { id } });
    return true;
  };

  return {
    create,
    remove,
    findAll,
    findById,
    update,
  };
};