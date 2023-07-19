import checkPermissions from '@/app/util/checkPermissions';
import { transactionApi } from '@/server/useCases';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
	try {
		const userId = await checkPermissions();
		const input = await request.json();
		input.user = userId;
		const transaction = await transactionApi.create(input);

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

		const transactions = await transactionApi.retrieve({ userId, count });

		return new Response(JSON.stringify(transactions), {
			status: 200,
		});
	} catch (e: any) {
		return new Response(e.message, {
			status: 500,
		});
	}
};
