import { tagRepository } from '@/infrastructure/repository/prisma';
import { makeRemoveTagUseCase } from './Tag/crudTag';

export const removeTag = makeRemoveTagUseCase({
	tagRepository,
});
