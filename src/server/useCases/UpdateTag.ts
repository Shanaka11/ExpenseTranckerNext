import { tagRepository } from '@/infrastructure/repository/prisma';
import { makeUpdateTagUseCase } from './Tag/crudTag';
import { generateId } from '.';
import { Tag } from '../models/Tag';

const validateModel = (data: Tag) => {
	return;
};

export const updateTag = makeUpdateTagUseCase({
	tagRepository,
	generateId,
	validateModel,
});
