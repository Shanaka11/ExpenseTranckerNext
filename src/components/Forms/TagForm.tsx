'use client';
import React, { useEffect, useState } from 'react';
import Input from '../Input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Button from '../Button';
import Dialog from '../Dialog/Dialog';
import useMutation from './useMutation';
import toast from 'react-hot-toast';
import { Tag } from '@/server/models/Tag';
import {
	deleteTagService,
	insertTagService,
	updateTagService,
} from '@/ClientServices/ClientTagServices';

// This form will be used to create and edit transactions
type FormInputs = {
	name: string;
};

export type TransactinFormProps = {
	title?: string;
	dataItem?: any;
	open?: boolean;
	noOpenButton?: boolean;
	handleDialogClose?: () => void;
};

const TagForm: React.FC<TransactinFormProps> = ({
	title,
	dataItem,
	open,
	noOpenButton,
	handleDialogClose,
}) => {
	const [defaultValues, setDefaultValues] = useState({
		name: dataItem !== undefined ? dataItem.name : '',
	});

	const [openNewTagDialog, setOpenNewTagDialog] = useState(
		open !== undefined ? open : false
	);
	const [closeOnSuccessfullSave, setCloseOnSuccessfullSave] = useState(false);

	const { control, handleSubmit, reset, setValue } = useForm<FormInputs>({
		defaultValues: {
			...defaultValues,
		},
	});
	// Insert
	const { isLoading: createIsLoading, mutate: create } = useMutation(
		insertTagService,
		{
			onError: (message) => {
				toast.error(message);
				reset(defaultValues);
			},
			onScucces: (data) => {
				if (closeOnSuccessfullSave) {
					closeDialog();
					setCloseOnSuccessfullSave(false);
				}
				reset(defaultValues);
				toast.success('Transaction Added');
			},
		}
	);
	// Delete
	const { isLoading: updateIsLoading, mutate: remove } = useMutation(
		deleteTagService,
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
		updateTagService,
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
		if (open) {
			setOpenNewTagDialog(open);
		}
	}, [open]);

	useEffect(() => {
		if (dataItem !== undefined) {
			// Set each field value
			setValue('name', dataItem.name);
		}
	}, [dataItem, setValue]);

	const closeDialog = () => {
		setOpenNewTagDialog(false);
		if (handleDialogClose) handleDialogClose();
	};

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		// Depending if dataitem is present then update else create new
		if (dataItem !== undefined) {
			update(data, dataItem.id);
		} else {
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
				form='TagForm'
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
				open={openNewTagDialog}
				handleOpen={() => setOpenNewTagDialog(true)}
				handleClose={() => closeDialog()}
				handleSubmitAndClose={() => handleOnSubmitAndClose()}
				title={title ?? 'Add New Tag'}
				dialogButtonProps={{
					className: 'cursor-pointer rounded-lg bg-blue-400 p-1 text-white ',
					type: 'button',
					label: title ?? 'Add New Tag',
				}}
				additionalActions={
					dataItem !== undefined ? CustomActionUpdate : CustomActionsNew
				}
				defaultSubmit={false}
				formId='TagForm'
				isLoading={createIsLoading || deleteIsLoading || updateIsLoading}
				noOpenButton={noOpenButton}
				okButtonLabel={dataItem !== undefined ? 'Update' : 'Add'}
			>
				<form id='TagForm' onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='name'
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<Input
								type='text'
								label='Name'
								id='name'
								required={true}
								{...field}
							/>
						)}
					/>
				</form>
			</Dialog>
		</>
	);
};

export default TagForm;
