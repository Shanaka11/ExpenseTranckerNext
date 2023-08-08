import { z } from 'zod';

export const GenerateReportInoutSchema = z.object({
	from: z.coerce.date().transform((from) => from.toISOString().slice(0, 10)),
	to: z.coerce.date().transform((to) => to.toISOString().slice(0, 10)),
});
