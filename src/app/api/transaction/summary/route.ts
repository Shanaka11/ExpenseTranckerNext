import checkPermissions from '@/app/util/checkPermissions';
import { getExpenseByTags } from '@/server/useCases/ExpenseByTags';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
	try {
		const userId = await checkPermissions();

		const summary = await getExpenseByTags(userId);

		return new Response(JSON.stringify(summary), {
			status: 200,
		});
	} catch (e: any) {
		return new Response(e.message, {
			status: 500,
		});
	}
};
