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
		console.log(e);
		// return NextResponse.json({message: 'Could not create transction' })
		return new NextResponse(
			JSON.stringify({ message: 'Could not create transction' }),
			{
				status: 500,
			}
		);
	}
};
export const GET = async () => {
	try {
		const userId = await checkPermissions();

		const transactions = await transactionApi.retrieve();

		return new Response(JSON.stringify(transactions), {
			status: 200,
		});
	} catch (e: any) {
		return new Response(e.message, {
			status: 500,
		});
	}
};
