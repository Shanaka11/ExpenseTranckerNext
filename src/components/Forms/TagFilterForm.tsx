'use client';
import React, { useEffect, useState } from 'react';
import Dialog from '../Dialog/Dialog';
import FilterIcon from '../Icons/FilterIcon';
import { Controller, useForm } from 'react-hook-form';
import Input from '../Input';
import Button from '../Button';
import HelpIcon from '../Icons/HelpIcon';
import { BaseObjectType } from '../Table/useFilter';

export type TagFilterKey = 'name';

export type TagFilter = {
	name: string;
};

type TagFilterFormProps = {
	handleDialogClose: (queryFilters: BaseObjectType) => void;
	activeFilters: BaseObjectType;
};

type FormData = {
	name: string;
};

const TagFilterForm: React.FC<TagFilterFormProps> = ({
	handleDialogClose,
	activeFilters,
}) => {
	// Should be able to add custom filters here

	const [openNewTagDialog, setOpenNewTagDialog] = useState(false);

	const { control, handleSubmit, setValue } = useForm<FormData>({
		defaultValues: {
			name: activeFilters.name ?? '',
		},
	});

	useEffect(() => {
		setValue('name', activeFilters.name);
	}, [activeFilters, setValue]);

	const onSubmit = (data: FormData) => {
		setOpenNewTagDialog(false);
		handleDialogClose(data);
	};

	const closeDialog = () => {
		setOpenNewTagDialog(false);
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
