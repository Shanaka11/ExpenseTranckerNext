'use client';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../Input';
import Button from '../Button';
import { createQueryString } from '@/filterUtil';
import { useRouter } from 'next/navigation';
import { GenerateReportInoutSchema } from '@/infrastructure/validation/GenerateReportInoutValidationSchema';

type FormData = {
	from: string;
	to: string;
};

type AnalyticDateRangeFormProps = {
	initialFrom?: string;
	initialTo?: string;
};

const AnalyticDateRangeForm: React.FC<AnalyticDateRangeFormProps> = ({
	initialFrom,
	initialTo,
}) => {
	const router = useRouter();
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			from: initialFrom ?? '',
			to: initialTo ?? '',
		},
		resolver: zodResolver(GenerateReportInoutSchema),
	});

	useEffect(() => {
		setValue('from', initialFrom ?? '');
		setValue('to', initialTo ?? '');
	}, [initialFrom, initialTo, setValue]);

	const handleFormSubmit = (data: FormData) => {
		console.log(data);
		const queryString = createQueryString({
			from: `>= ${data.from}`,
			to: `<= ${data.to}`,
		});
		router.push(`dashboard/analytics/${queryString}`);
	};

	return (
		<form
			className='flex items-center gap-1 overflow-y-scroll rounded-lg bg-white px-4 drop-shadow-md'
			onSubmit={handleSubmit(handleFormSubmit)}
		>
			<Controller
				name='from'
				control={control}
				render={({ field }) => (
					<Input
						type='date'
						error={errors?.from?.message}
						label='From'
						autoFocus
						id='from'
						{...field}
					/>
				)}
			/>
			<Controller
				name='to'
				control={control}
				render={({ field }) => (
					<Input
						type='date'
						error={errors?.to?.message}
						label='To'
						autoFocus
						id='to'
						{...field}
					/>
				)}
			/>
			<div className='ml-auto'>
				<Button
					label='Generate Report'
					type='submit'
					className='min-w-fit whitespace-nowrap'
				/>
			</div>
		</form>
	);
};

export default AnalyticDateRangeForm;
