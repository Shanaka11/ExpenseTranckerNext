import { AnyZodObject } from 'zod';

export const validateModel = (
	schema: AnyZodObject,
	data: any,
	throwException: boolean = false
) => {
	try {
		schema.parse(data);
	} catch (e: any) {
		if (throwException) {
			throw e.errors;
		}
		return e.errors;
	}
};
