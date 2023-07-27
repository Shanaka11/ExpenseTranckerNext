import { Tag } from '@/server/models/Tag';
import { prisma } from './PrismaSingleton';

const create = async (data: Tag) => {
	const created = await prisma.tag.create({ data });
	return created;
};

const findById = async (id: string) => {
	const found = await prisma.tag.findUnique({ where: { id } });
	return found || null;
};

const findAll = async (where: any) => {
	const all = await prisma.tag.findMany({
		where: where,
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
