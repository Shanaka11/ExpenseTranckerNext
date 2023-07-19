import { z } from 'zod';

export const TransactionScehma = z.object({
	amount: z.number({
		required_error: 'Amount is required',
	}),
	date: z.string({
		required_error: 'Date is required',
	}),
	description: z.string().max(200, {
		message: 'Description too long, must be less than 200 charaters',
	}),
	tags: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
		})
	),
});
