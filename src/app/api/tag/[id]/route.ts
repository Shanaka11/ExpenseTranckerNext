import { tagApi } from '@/server/useCases';
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
		const tag = await tagApi.retrieve(params.id);

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
		const tag = await tagApi.update(params.id, input);

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
		const tag = await tagApi.remove(params.id);

		return new Response(null, {
			status: 204,
		});
	} catch (e: any) {
		return new Response(e, {
			status: 500,
		});
	}
};
