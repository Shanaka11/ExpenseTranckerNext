export const insertTransactionService = async (data: any) => {
	let response = await fetch('api/transaction', {
		method: 'POST',
		body: JSON.stringify(data),
	});
	return response;
};

export const deleteTransactionService = async (id: string) => {
	let response = await fetch(`api/transaction/${id}`, {
		method: 'DELETE',
	});
	return response;
};

export const updateTransactionService = async (data: any, id: string) => {
	let response = await fetch(`api/transaction/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
	});
	return response;
};
