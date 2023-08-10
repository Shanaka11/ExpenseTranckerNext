import checkPermissions from '@/app/_util/checkPermissions';
import { removeTag } from '@/server/useCases/RemoveTag';
import { retrieveTag } from '@/server/useCases/RetrieveTag';
import { updateTag } from '@/server/useCases/UpdateTag';
import { NextRequest } from 'next/server';

// Get Tags / Implement filters later
export const GET = async (
	request: NextRequest,
	{
		params,
	}: {
		params: { id: string };
	}
) => {
	try {
		const userId = await checkPermissions();
		const tag = await retrieveTag({
			id: params.id,
			where: {
				user: userId,
			},
		});

		return new Response(JSON.stringify(tag), {
			status: 200,
		});
	} catch (e: any) {
		return new Response(e, {
			status: 500,
		});
	}
};

export const PUT = async (
	request: NextRequest,
	{
		params,
	}: {
		params: { id: string };
	}
) => {
	try {
		const input = await request.json();
		const tag = await updateTag(params.id, input);

		return new Response(JSON.stringify(tag), {
			status: 200,
		});
	} catch (e: any) {
		return new Response(e, {
			status: 500,
		});
	}
};

export const DELETE = async (
	request: NextRequest,
	{
		params,
	}: {
		params: { id: string };
	}
) => {
	try {
		const tag = await removeTag(params.id);

		return new Response(null, {
			status: 204,
		});
	} catch (e: any) {
		return new Response(e, {
			status: 500,
		});
	}
};
