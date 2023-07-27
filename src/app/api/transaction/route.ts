import checkPermissions from '@/app/util/checkPermissions';
import { createTransaction } from '@/server/useCases/CreateTransaction';
import { retrieveTransaction } from '@/server/useCases/RetrieveTransaction';

import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
	try {
		const userId = await checkPermissions();
		const input = await request.json();
		input.user = userId;
		const transaction = await createTransaction(input);

		return new NextResponse(JSON.stringify(transaction), {
			status: 200,
		});
	} catch (e: any) {
		return new NextResponse(
			JSON.stringify({ message: 'Could not create transction' }),
			{
				status: 500,
			}
		);
	}
};

export const GET = async (request: NextRequest) => {
	try {
		const userId = await checkPermissions();
		const url = new URL(request.url);
		const count = url.searchParams.get('count')
			? parseInt(url.searchParams.get('count')!)
			: undefined;

		const transactions = await retrieveTransaction({ userId, count });

		return new Response(JSON.stringify(transactions), {
			status: 200,
		});
	} catch (e: any) {
		return new Response(e.message, {
			status: 500,
		});
	}
};
