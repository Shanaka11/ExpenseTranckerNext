import { createTag } from '@/server/useCases/CreateTag';
import { retrieveTag } from '@/server/useCases/RetrieveTag';
import { NextRequest } from 'next/server';

// Create Tag
export const POST = async (request: NextRequest) => {
	try {
		const input = await request.json();

		const tag = await createTag(input);

		return new Response(JSON.stringify(tag), {
			status: 201,
		});
	} catch (e: any) {
		return new Response(e, {
			status: 500,
		});
	}
};

// Get Tags / Implement filters later
export const GET = async (request: NextRequest) => {
	try {
		const tags = await retrieveTag({ where: {} });

		return new Response(JSON.stringify(tags), {
			status: 200,
		});
	} catch (e: any) {
		return new Response(e, {
			status: 500,
		});
	}
};
