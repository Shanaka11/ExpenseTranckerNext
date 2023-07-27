import { Tag as ClientTag, makeCreateTag } from '@/server/models/Tag';
import { Tag } from '@prisma/client';

type TagRepository = {
	create: (data: Tag) => Promise<Tag>;
	remove: (id: string) => Promise<boolean>;
	findAll: (where: any) => Promise<Tag[]>;
	findById: (id: string) => Promise<Tag | null>;
	update: (id: string, data: Tag) => Promise<Tag>;
};

type MakeCreateTagUseCase = {
	tagRepository: TagRepository;
	generateId: () => string;
	validateModel: (data: any) => void;
};

type MakeRetrieveTagUseCase = {
	tagRepository: TagRepository;
};

type MakeUpdateTagUseCase = {
	tagRepository: TagRepository;
	generateId: () => string;
	validateModel: (data: any) => void;
};

type MakeRemoveTagUseCase = {
	tagRepository: TagRepository;
};

export const makeCreateTagUseCase = ({
	tagRepository,
	generateId,
	validateModel,
}: MakeCreateTagUseCase) => {
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

	return create;
};

export const makeRetrieveTagUseCase = ({
	tagRepository,
}: MakeRetrieveTagUseCase) => {
	const retrieve = async ({ id, where }: { id?: string; where: any }) => {
		// For now all records are retrieved, adjust this so we can include filtering
		// Retrieve the tag using the repository method
		try {
			if (id) {
				const response = await tagRepository.findById(id);
				return response;
			}
			const response = await tagRepository.findAll(where);
			return response;
		} catch (e) {
			throw e;
		}
	};

	return retrieve;
};

export const makeUpdateTagUseCase = ({
	tagRepository,
	generateId,
	validateModel,
}: MakeUpdateTagUseCase) => {
	const createTag = makeCreateTag({
		generateId,
		validateModel,
	});

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

	return update;
};

export const makeRemoveTagUseCase = ({
	tagRepository,
}: MakeRemoveTagUseCase) => {
	const remove = async (id: string) => {
		// Remove the tag using the repository method
		try {
			const response = await tagRepository.remove(id);
			return response;
		} catch (e) {
			throw e;
		}
	};

	return remove;
};
