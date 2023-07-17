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
import toast from 'react-hot-toast';
import { Transaction } from '@/server/models/Transaction';
import { formatDateToInput } from '@/app/util/formatDate';
import {
	deleteTransactionService,
	insertTransactionService,
	updateTransactionService,
} from '@/ClientServices/ClientTransactionServices';

// Today
const date = new Date();
// This form will be used to create and edit transactions
type FormInputs = {
	amount: number;
	date: string;
	description: string;
	tags: any[];
};

export type TransactinFormProps = {
	baseFormId?: string;
	initialAmount?: number;
	title?: string;
	dataItem?: any;
	open?: boolean;
	noOpenButton?: boolean;
	handleDialogClose?: () => void;
	options?: any[];
};

const TransactionForm: React.FC<TransactinFormProps> = ({
	baseFormId,
	initialAmount,
	title,
	dataItem,
	open,
	noOpenButton,
	handleDialogClose,
	options,
}) => {
	// TODO: Update transaction with tags not working at the moment
	const [defaultValues, setDefaultValues] = useState({
		amount: dataItem !== undefined ? dataItem.amount : 0,
		date:
			dataItem !== undefined
				? formatDateToInput(new Date(dataItem.date))
				: formatDateToInput(date),
		description: dataItem !== undefined ? dataItem.description : '',
		tags: dataItem !== undefined ? dataItem.tags : [],
	});

	const [isExpense, setIsExpense] = useState(true);

	const [openNewTransactionDialog, setOpenNewTransactionDialog] = useState(
		open !== undefined ? open : false
	);
	const [closeOnSuccessfullSave, setCloseOnSuccessfullSave] = useState(false);

	const { control, handleSubmit, reset, setValue } = useForm<FormInputs>({
		defaultValues: {
			...defaultValues,
			amount: initialAmount,
		},
	});
	// Insert
	const { isLoading: createIsLoading, mutate: create } = useMutation(
		insertTransactionService,
		{
			onError: (message) => {
				toast.error(message);
				reset(defaultValues);
				setIsExpense(true);
			},
			onScucces: (data) => {
				if (closeOnSuccessfullSave) {
					closeDialog();
					setCloseOnSuccessfullSave(false);
				}
				setIsExpense(true);
				reset(defaultValues);
				toast.success('Transaction Added');
			},
		}
	);
	// Delete
	const { isLoading: updateIsLoading, mutate: remove } = useMutation(
		deleteTransactionService,
		{
			onError: (message) => {
				toast.error(message);
			},
			onScucces: (data) => {
				closeDialog();
				toast.success('Transaction deleted');
			},
		}
	);
	// Update
	const { isLoading: deleteIsLoading, mutate: update } = useMutation(
		updateTransactionService,
		{
			onError: (message) => {
				toast.error(message);
			},
			onScucces: (data) => {
				closeDialog();
				toast.success('Transaction updated');
			},
		}
	);
	useEffect(() => {
		setValue('amount', initialAmount ?? 0);
	}, [initialAmount, setValue]);

	useEffect(() => {
		if (open) {
			setOpenNewTransactionDialog(open);
		}
	}, [open]);

	useEffect(() => {
		if (dataItem !== undefined) {
			// Set each field value
			if (dataItem.amount > 0) {
				setIsExpense(false);
			} else {
				setIsExpense(true);
			}
			setValue(
				'amount',
				dataItem.amount < 0 ? dataItem.amount * -1 : dataItem.amount
			);
			setValue('date', formatDateToInput(new Date(dataItem.date)));
			setValue('description', dataItem.description);
			setValue('tags', dataItem.tags);
		}
	}, [dataItem, setValue]);

	const closeDialog = () => {
		setOpenNewTransactionDialog(false);
		if (handleDialogClose) handleDialogClose();
	};

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		// Depending if dataitem is present then update else create new
		data.date = new Date(date).toISOString();
		data.amount = isExpense ? -1 * data.amount : data.amount;

		// console.log(data);
		if (dataItem !== undefined) {
			update(data, dataItem.id);
		} else {
			data.tags = data.tags.map((item) => item.value);
			create(data);
		}
	};

	const handleDelete = () => {
		remove(dataItem.id);
	};

	const handleOnSubmitAndClose = () => {
		// Setting this will close the dialog on successfull save
		setCloseOnSuccessfullSave(true);
		// Set this to false when an update request either succeeds or fails
	};
	const CustomActionsNew = (
		<>
			<Button
				type='submit'
				form='TransactionForm'
				label='Add Another'
				disabled={createIsLoading || deleteIsLoading || updateIsLoading}
			/>
		</>
	);

	const CustomActionUpdate = (
		<>
			<Button
				label='Delete'
				disabled={createIsLoading || deleteIsLoading || updateIsLoading}
				onClick={() => handleDelete()}
				className='ml-2 bg-red-400 hover:bg-red-500 disabled:bg-red-200'
			/>
		</>
	);

	return (
		<>
			{/* Dialog Content */}
			<Dialog
				open={openNewTransactionDialog}
				handleOpen={() => setOpenNewTransactionDialog(true)}
				handleClose={() => closeDialog()}
				handleSubmitAndClose={() => handleOnSubmitAndClose()}
				title={title ?? 'Add New Transaction'}
				dialogButtonProps={{
					className: 'cursor-pointer rounded-lg bg-blue-400 p-1 text-white ',
					type: { baseFormId } ? 'submit' : 'button',
					form: baseFormId,
					label: title ?? 'Add New Transactions',
				}}
				additionalActions={
					dataItem !== undefined ? CustomActionUpdate : CustomActionsNew
				}
				defaultSubmit={false}
				formId='TransactionForm'
				isLoading={createIsLoading || deleteIsLoading || updateIsLoading}
				noOpenButton={noOpenButton}
				okButtonLabel={dataItem !== undefined ? 'Update' : 'Add'}
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
						<div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 "></div>
						<span className='text-gray-90 ml-3 text-sm font-medium'>
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
							<Autocomplete
								{...field}
								options={options}
								getOptionLabel={(option: any) => option.name}
								getOptionValue={(option: any) => option.id}
							/>
						)}
					/>
				</form>
			</Dialog>
		</>
	);
};

export default TransactionForm;
