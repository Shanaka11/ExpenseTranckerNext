import { tagRepository } from '@/infrastructure/repository/prisma';
import { generateId } from '.';
import { Tag } from '../models/Tag';
import { makeCreateTagUseCase } from './Tag/crudTag';

const validateModel = (data: Tag) => {
	return;
};

export const createTag = makeCreateTagUseCase({
	tagRepository,
	generateId,
	validateModel,
});
