'use client';
import React, { useEffect, useState } from 'react';
import Input from '../Input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import InputArea from '../InputArea';
import Autocomplete from '../Autocomplete';
import CloseIcon from '../Icons/CloseIcon';
import Button from '../Button';
import Dialog from '../Dialog/Dialog';

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
	amount: number | string;
	date: string;
	description: string;
	tags: string[];
};

type TransactinFormProps = {
	baseFormId?: string;
	initialAmount?: number | string;
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

	const [openNewTransactionDialog, setOpenNewTransactionDialog] =
		useState(false);
	const [closeOnSuccessfullSave, setCloseOnSuccessfullSave] = useState(false);

	const { control, handleSubmit, reset, setValue } = useForm<FormInputs>({
		defaultValues: {
			...defaultValues,
			amount: initialAmount,
		},
	});

	useEffect(() => {
		setValue('amount', initialAmount ?? 0);
	}, [initialAmount, setValue]);

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		reset(defaultValues);
	};

	const handleOnSubmitAndClose = () => {
		// Setting this will close the dialog on successfull save
		setCloseOnSuccessfullSave(true);
		// Set this to false when an update request either succeeds or fails
	};
	const CustomActions = (
		<>
			<Button type='submit' form='TransactionForm' label='Add Another' />
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
			>
				<form id='TransactionForm' onSubmit={handleSubmit(onSubmit)}>
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
							/>
						)}
					/>
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
