import { z } from 'zod';

export const TagScehma = z.object({
	name: z
		.string({
			required_error: 'Amount is required',
		})
		.max(100, { message: 'Name should have less than 100 characters' }),
});
