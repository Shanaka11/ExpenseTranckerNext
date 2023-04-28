import { prisma } from ".";

// Define a generic repository function
export const createBaseRepository = <T>(model:string) => {
  return {
    create: async (data: T): Promise<T> => {
      const created = await prisma[model].create({ data });
      return created;
    },

    findById: async (id: string): Promise<T | null> => {
      const found = await prisma[model].findUnique({ where: { id } });
      return found || null;
    },

    findAll: async (): Promise<T[]> => {
      const all = await prisma[model].findMany();
      return all;
    },

    update: async (id: string, data: T): Promise<T | null> => {
      const updated = await prisma[model].update({ where: { id }, data });
      return updated || null;
    },

    remove: async (id: string): Promise<boolean> => {
      await prisma[model].delete({ where: { id } });
      return true;
    },
  };
}
