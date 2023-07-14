import { useState } from 'react';

const useMutation = (callback: any) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setError] = useState(false);

	const mutate = async (data: any) => {
		setIsLoading(true);
		const response = await callback(data);
		// Check for errors
		setIsLoading(false);
	};

	return {
		isLoading,
		isError,
		mutate,
	};
};

export default useMutation;
