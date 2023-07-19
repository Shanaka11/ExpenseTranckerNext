import checkPermissions from '@/app/util/checkPermissions';
import { transactionApi } from '@/server/useCases';
import { NextRequest, NextResponse } from 'next/server';

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
		const tag = await transactionApi.retrieve({
			userId: userId,
			id: params.id,
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
		const tag = await transactionApi.update(params.id, input);

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
		const tag = await transactionApi.remove(params.id);

		return new Response(null, {
			status: 204,
		});
	} catch (e: any) {
		return new NextResponse(
			JSON.stringify({ message: 'Could not delete transction' }),
			{
				status: 500,
			}
		);
	}
};
