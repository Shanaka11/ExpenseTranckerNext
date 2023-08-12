import { Tag } from '@/server/models/Tag';
import { prisma } from './PrismaSingleton';
import { QueryOptions } from '.';

const create = async (data: Tag) => {
	try {
		const created = await prisma.tag.create({ data });
		return created;
	} catch (e: any) {
		if (e.code === 'P2002') {
			throw new Error(`User Already has a tag called ${data.name}`);
		}
		throw e;
	}
};

const findById = async (id: string) => {
	const found = await prisma.tag.findUnique({ where: { id } });
	return found || null;
};

const findAll = async (options: QueryOptions) => {
	const all = await prisma.tag.findMany({
		where: options?.where,
		take: options?.count,
	});
	return all;
};

const update = async (id: string, data: Tag) => {
	const updated = await prisma.tag.update({ where: { id }, data });
	return updated || null;
};

const remove = async (id: string) => {
	await prisma.tag.delete({ where: { id } });
	return true;
};

const tagRepository = {
	create,
	remove,
	findAll,
	findById,
	update,
};
export default tagRepository;
