import { useState } from 'react';

type MutationOptions = {
	onScucces?: (data: any) => void;
	onError?: (error: string) => void;
};

const useMutation = (callback: any, options?: MutationOptions) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setError] = useState(false);

	const handleMutationOnSuccess = (data: any) => {
		if (options?.onScucces) {
			options.onScucces(data);
		}
	};

	const handleMutationOnError = (message: string) => {
		if (options?.onError) {
			options.onError(message);
		}
	};

	const mutate = async (data: any) => {
		setIsLoading(true);
		let response = await callback(data);
		if (response.status === 500) {
			handleMutationOnError((await response.json()).message);
		} else {
			handleMutationOnSuccess(await response.json());
		}
		setIsLoading(false);
	};

	return {
		isLoading,
		isError,
		mutate,
	};
};

export default useMutation;
