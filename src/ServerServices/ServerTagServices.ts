import { auth } from '@clerk/nextjs';

export const getTagsService = async () => {
	const { getToken } = auth();
	const token = await getToken();

	const res = await fetch('http://localhost:3000/api/tag', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		throw new Error(
			'Error, unable to fetch data from the server, Try refreshing or contact customer support if the issue persists'
		);
	}
	// const test = await res.json();
	return await res.json();
};
