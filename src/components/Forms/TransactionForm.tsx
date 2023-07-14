'use client';
import React, { useEffect, useState } from 'react';
import Input from '../Input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import InputArea from '../InputArea';
import Autocomplete from '../Autocomplete';
import CloseIcon from '../Icons/CloseIcon';
import Button from '../Button';
import Dialog from '../Dialog/Dialog';
import useMutation from './useMutation';

const options = [
	{ value: 1, label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
	{ value: 'test', label: 'Test' },
	{ value: 'test2', label: 'Test2' },
	{ value: 'test3', label: 'Test3' },
];

// Today
const date = new Date();
// This form will be used to create and edit transactions
type FormInputs = {
	amount: number;
	date: string;
	description: string;
	tags: string[];
};

type TransactinFormProps = {
	baseFormId?: string;
	initialAmount?: number;
	title?: string;
};
const TransactionForm: React.FC<TransactinFormProps> = ({
	baseFormId,
	initialAmount,
	title,
}) => {
	const defaultValues = {
		amount: 0,
		date: `${date.getFullYear()}-${(date.getMonth() + 1)
			.toString()
			.padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
		description: '',
		tags: [],
	};

	const [isExpense, setIsExpense] = useState(true);

	const [openNewTransactionDialog, setOpenNewTransactionDialog] =
		useState(false);
	const [closeOnSuccessfullSave, setCloseOnSuccessfullSave] = useState(false);

	const { control, handleSubmit, reset, setValue } = useForm<FormInputs>({
		defaultValues: {
			...defaultValues,
			amount: initialAmount,
		},
	});

	const { isLoading, mutate } = useMutation(async (data: any) => {
		await fetch('http://localhost:3000/api/transaction', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	});

	useEffect(() => {
		setValue('amount', initialAmount ?? 0);
	}, [initialAmount, setValue]);

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		data.date = new Date(date).toISOString();
		data.amount = isExpense ? -1 * data.amount : data.amount;
		mutate(data);
		reset(defaultValues);
	};

	const handleOnSubmitAndClose = () => {
		// Setting this will close the dialog on successfull save
		setCloseOnSuccessfullSave(true);
		// Set this to false when an update request either succeeds or fails
	};
	const CustomActions = (
		<>
			<Button
				type='submit'
				form='TransactionForm'
				label='Add Another'
				disabled={isLoading}
			/>
		</>
	);

	return (
		<>
			{/* Dialog Content */}
			<Dialog
				open={openNewTransactionDialog}
				handleOpen={() => setOpenNewTransactionDialog(true)}
				handleClose={() => setOpenNewTransactionDialog(false)}
				handleSubmitAndClose={() => handleOnSubmitAndClose()}
				title='Add New Transaction'
				dialogButtonProps={{
					className: 'cursor-pointer rounded-lg bg-blue-400 p-1 text-white ',
					type: { baseFormId } ? 'submit' : 'button',
					form: baseFormId,
					label: title ?? 'Add New Transactions',
				}}
				additionalActions={CustomActions}
				defaultSubmit={false}
				formId='TransactionForm'
				isLoading={isLoading}
			>
				<form id='TransactionForm' onSubmit={handleSubmit(onSubmit)}>
					{isLoading && <div>Loading...</div>}
					<Controller
						name='amount'
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<Input
								type='number'
								label='Transaction Amount'
								id='transaction'
								className='text-right'
								{...field}
								onChange={(event) => field.onChange(+event.target.value)}
							/>
						)}
					/>
					<label className='relative mb-5 inline-flex cursor-pointer items-center'>
						<input
							type='checkbox'
							value=''
							onChange={(event) => setIsExpense((prevState) => !prevState)}
							className='peer sr-only'
							checked={isExpense}
						/>
						<div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
						<span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
							Expense
						</span>
					</label>
					<Controller
						name='date'
						control={control}
						render={({ field }) => (
							<Input type='date' label='Date' autoFocus id='date' {...field} />
						)}
					/>
					{/* This should be a multiline input */}
					<Controller
						name='description'
						control={control}
						render={({ field }) => (
							<InputArea
								type='text'
								label='Description'
								id='description'
								{...field}
							/>
						)}
					/>
					<Controller
						name='tags'
						control={control}
						render={({ field }) => (
							<Autocomplete {...field} options={options} />
						)}
					/>
				</form>
			</Dialog>
		</>
	);
};

export default TransactionForm;
