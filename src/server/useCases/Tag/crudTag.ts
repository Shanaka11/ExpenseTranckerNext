import { Tag as ClientTag, makeCreateTag } from '@/server/models/Tag';
import { IRepository } from '@/infrastructure/repository/prisma';
import { generateId } from '..';
import { Tag } from '@prisma/client';

const validateModel = (data: Tag) => {
	return;
};

export const makeTagCrudUseCase = ({
	tagRepository,
}: {
	tagRepository: IRepository<ClientTag, Tag>;
}) => {
	const createTag = makeCreateTag({
		generateId,
		validateModel,
	});

	const create = async (data: ClientTag) => {
		try {
			const tag = createTag(data);
			const response = await tagRepository.create(tag);
			return response;
		} catch (e) {
			throw e;
		}
	};

	const retrieve = async (id?: string) => {
		// For now all records are retrieved, adjust this so we can include filtering
		// Retrieve the tag using the repository method
		try {
			if (id) {
				const response = await tagRepository.findById(id);
				return response;
			}
			const response = await tagRepository.findAll();
			return response;
		} catch (e) {
			throw e;
		}
	};

	const update = async (id: string, data: ClientTag) => {
		// Update the tag using the repository method
		try {
			const tag = createTag({ ...data, id });
			const response = await tagRepository.update(id, tag);
			return response;
		} catch (e) {
			throw e;
		}
	};

	const remove = async (id: string) => {
		// Remove the tag using the repository method
		try {
			const response = await tagRepository.remove(id);
			return response;
		} catch (e) {
			throw e;
		}
	};

	return {
		create,
		remove,
		retrieve,
		update,
	};
};
