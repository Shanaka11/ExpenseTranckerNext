'use client';
import React, { useEffect, useState } from 'react';
import { BaseObjectType } from '../Table/useFilter';
import { Controller, useForm } from 'react-hook-form';
import Dialog from '../Dialog/Dialog';
import FilterIcon from '../Icons/FilterIcon';
import Input from '../Input';
import InputArea from '../InputArea';
import {
	formatFilterValue,
	formatFilterValueArray,
	formatFilterValueDate,
	matchFilterArrayToObject,
} from '@/filterUtil';
import Autocomplete from '../Autocomplete';
import { Tag } from '@/server/models/Tag';

type TransactionFilterFormProps = {
	handleDialogClose: (queryFilters: BaseObjectType) => void;
	activeFilters: BaseObjectType;
	options?: {
		tagList: any[];
	};
};

type FormData = {
	amount: string;
	date: string; // When date should be exact
	from: string;
	to: string;
	tags: Tag[];
};

const TransactionFilterForm: React.FC<TransactionFilterFormProps> = ({
	handleDialogClose,
	activeFilters,
	options,
}) => {
	const [openNewTagDialog, setOpenNewTagDialog] = useState(false);
	const [isExactDate, setIsExactDate] = useState(
		activeFilters.date ? true : false
	);
	const { control, handleSubmit, setValue } = useForm<FormData>({
		defaultValues: {
			amount: formatFilterValue(activeFilters.amount),
			from: formatFilterValueDate(activeFilters.from),
			to: formatFilterValueDate(activeFilters.to),
			date: formatFilterValueDate(activeFilters.date),
			tags: matchFilterArrayToObject(
				activeFilters.tags,
				options?.tagList,
				(data: Tag) => data.name
			),
		},
	});

	useEffect(() => {
		setValue('amount', formatFilterValue(activeFilters.amount));
		setValue('from', formatFilterValueDate(activeFilters.from));
		setValue('to', formatFilterValueDate(activeFilters.to));
		setValue('date', formatFilterValueDate(activeFilters.date));
		setValue(
			'tags',
			matchFilterArrayToObject(
				activeFilters.tags,
				options?.tagList,
				(data: Tag) => data.name
			)
		);
	}, [activeFilters, setValue, options?.tagList]);

	const handleSetIsExactDateToggle = () => {
		if (isExactDate) {
			setValue('from', '');
			setValue('date', '');
		} else {
			setValue('date', '');
		}
		setIsExactDate((prevState) => !prevState);
	};

	const onSubmit = (data: FormData) => {
		setOpenNewTagDialog(false);
		if (data.amount.split(' ').length === 1 && data.amount !== '') {
			data.amount = `= ${data.amount}`;
		}
		// Both dates are not empty
		if (data.date !== '') {
			data.date = `= ${data.date}`;
			data.from = '';
			data.to = '';
		} else {
			data.date = '';
			if (data.from !== '') data.from = `>= ${data.from}`;
			if (data.to !== '') data.to = `<= ${data.to}`;
		}

		const modifiedData = {
			amount: data.amount,
			from: data.from,
			to: data.to,
			date: data.date,
			tags:
				data.tags.length > 0
					? `^ ${data.tags.map((tag) => tag.name).join(';')}`
					: '',
		};
		handleDialogClose(modifiedData);
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
			formId='TransactionFilterForm'
			noOpenButton={false}
			okButtonLabel={'Apply Filter'}
		>
			<div className='relative flex flex-col'>
				<form id='TransactionFilterForm' onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='amount'
						control={control}
						render={({ field }) => (
							<Input
								label='Transaction Amount'
								id='transaction amount'
								{...field}
								onChange={(event) => field.onChange(event.target.value)}
							/>
						)}
					/>
					<label className='relative mb-5 inline-flex cursor-pointer items-center'>
						<input
							type='checkbox'
							value=''
							onChange={(event) => handleSetIsExactDateToggle()}
							className='peer sr-only'
							checked={isExactDate}
						/>
						<div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 "></div>
						<span className='text-gray-90 ml-3 text-sm font-medium'>
							Use Exact Date
						</span>
					</label>
					{isExactDate ? (
						<Controller
							name='date'
							control={control}
							render={({ field }) => (
								<Input
									type='date'
									label='Date'
									autoFocus
									id='date'
									{...field}
								/>
							)}
						/>
					) : (
						<>
							<Controller
								name='from'
								control={control}
								render={({ field }) => (
									<Input
										type='date'
										label='From Date'
										autoFocus
										id='date'
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
										label='To Date'
										autoFocus
										id='date'
										{...field}
									/>
								)}
							/>
						</>
					)}
					<Controller
						name='tags'
						control={control}
						render={({ field }) => (
							<Autocomplete
								{...field}
								options={options?.tagList}
								getOptionLabel={(option: any) => option.name}
								getOptionValue={(option: any) => option.id}
							/>
						)}
					/>
				</form>
			</div>
		</Dialog>
	);
};

export default TransactionFilterForm;
