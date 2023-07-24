'use client';
import React, { useState } from 'react';
import Dialog from '../Dialog/Dialog';
import FilterIcon from '../Icons/FilterIcon';
import { Controller, useForm } from 'react-hook-form';
import Input from '../Input';
import Button from '../Button';
import AddNewIcon from '../Icons/AddNewIcon';
import HelpIcon from '../Icons/HelpIcon';

type TagFilterFormProps = {
	handleDialogClose: (queryString: string) => void;
};

type FormData = {
	name: string;
};

const TagFilterForm: React.FC<TagFilterFormProps> = ({ handleDialogClose }) => {
	// Should be able to add custom filters here

	const [openNewTagDialog, setOpenNewTagDialog] = useState(false);

	const { control, handleSubmit, reset } = useForm<FormData>({
		defaultValues: {
			name: '',
		},
	});

	const onSubmit = (data: FormData) => {
		setOpenNewTagDialog(false);
		// Construct the query params according to the filter texts, do not apply params if input is empty or ''
		let queryString = '?';
		if (data.name != '' || data.name != null) {
			// Check for operations, for text it could be either empty or =
			const queryParam = data.name.split(' ');
			if (queryParam[0] == '=') {
				queryString += `name=eq:${queryParam
					.slice(1, queryParam.length)
					.join(' ')}&`;
			} else {
				//The default behaviour
				queryString += `name=starts_with:${queryParam
					.slice(0, queryParam.length)
					.join(' ')}&`;
			}
		}
		if (queryString != '?') handleDialogClose(queryString.slice(0, -1));
		reset();
	};

	const closeDialog = () => {
		setOpenNewTagDialog(false);
		reset();
		// if (handleDialogClose) handleDialogClose();
	};

	return (
		<Dialog
			open={openNewTagDialog}
			handleOpen={() => setOpenNewTagDialog(true)}
			handleClose={() => closeDialog()}
			title={'Filter Data'}
			dialogButtonProps={{
				className: 'cursor-pointer rounded-lg bg-blue-400 p-1 text-white ',
				type: 'button',
				label: 'Apply Filter',
				icon: <FilterIcon />,
			}}
			defaultSubmit={false}
			formId='TagForm'
			noOpenButton={false}
			okButtonLabel={'Apply Filter'}
		>
			<div>
				{/* <Button
					label='Add filter'
					title='Add filter element'
					icon={<HelpIcon />}
				/> */}
				<form id='TagForm' onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='name'
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<Input
								autoFocus
								type='text'
								label='Name'
								id='name'
								required={true}
								{...field}
							/>
						)}
					/>
				</form>
			</div>
		</Dialog>
	);
};

export default TagFilterForm;
