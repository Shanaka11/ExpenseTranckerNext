import { tagRepository } from '@/infrastructure/repository/prisma';
import { makeRetrieveTagUseCase } from './Tag/crudTag';

export const retrieveTag = makeRetrieveTagUseCase({
	tagRepository,
});
