import { useState } from 'react';

type MutationOptions = {
	onScucces?: (data: any) => void;
	onError?: () => void;
	temp: number;
};

const useMutation = (callback: any, options?: MutationOptions) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setError] = useState(false);

	const handleMutationOnSuccess = (data: any) => {
		if (options?.onScucces) {
			options.onScucces(data);
		}
	};

	const mutate = async (data: any) => {
		setIsLoading(true);
		const response = await callback(data);
		// Assume this is a success
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
