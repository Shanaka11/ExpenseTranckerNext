export const insertTagService = async (data: any) => {
	let response = await fetch('http://localhost:3000/api/tag', {
		method: 'POST',
		body: JSON.stringify(data),
	});
	return response;
};

export const deleteTagService = async (id: string) => {
	let response = await fetch(`http://localhost:3000/api/tag/${id}`, {
		method: 'DELETE',
	});
	return response;
};

export const updateTagService = async (data: any, id: string) => {
	let response = await fetch(`http://localhost:3000/api/tag/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
	});
	return response;
};
