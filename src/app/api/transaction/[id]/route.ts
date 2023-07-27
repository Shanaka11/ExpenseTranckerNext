import checkPermissions from '@/app/util/checkPermissions';
import { removeTransaction } from '@/server/useCases/RemoveTransactions';
import { retrieveTransaction } from '@/server/useCases/RetrieveTransaction';
import { updateTransaction } from '@/server/useCases/UpdateTransaction';

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
		const tag = await retrieveTransaction({
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
		const tag = await updateTransaction(params.id, input);

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
		const tag = await removeTransaction(params.id);

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
