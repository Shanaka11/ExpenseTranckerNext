import React from 'react';
import Input from '../Input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import InputArea from '../InputArea';
import Autocomplete from '../Autocomplete';

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
	initialAmount: number | string;
};
const TransactionForm: React.FC<TransactinFormProps> = ({ initialAmount }) => {
	const { control, handleSubmit, reset } = useForm<FormInputs>({
		defaultValues: {
			amount: initialAmount,
			date: `${date.getFullYear()}-${(date.getMonth() + 1)
				.toString()
				.padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
			description: '',
		},
	});

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		console.log(data);
		reset();
	};

	return (
		<>
			{/* Overlay */}
			<div className='absolute left-0 top-0 z-10 h-screen w-screen cursor-pointer bg-slate-800/75' />
			<div className='absolute right-0 top-0 z-20 grid h-screen w-screen grid-rows-[60px_1fr_60px] bg-white p-2 md:w-96'>
				{/* Dialog Header (Title and Close Button) */}
				<div>
					<h1>Add New Transaction</h1>
					{/* This button is common to all dialogs so keep this in the common component */}
					<button>X</button>
				</div>
				{/* Dialog Content */}
				<form onSubmit={handleSubmit(onSubmit)}>
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
								autoFocus
								{...field}
							/>
						)}
					/>
					<Controller
						name='date'
						control={control}
						render={({ field }) => (
							<Input type='date' label='Date' id='date' {...field} />
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
					{/* Tags - Should be something like mui Auto Complete should show chips for each selected tag */}
					<Controller
						name='tags'
						control={control}
						render={({ field }) => (
							<Autocomplete {...field} options={options} />
						)}
					/>
				</form>
				{/* Dialog Action Button (Save / Close etc) */}
				<div className='flex'>
					<button>Add Another</button>
					{/* Default button Group (Ok, Cancel) */}
					<div className='ml-auto flex'>
						<button>Add</button>
						<button className='ml-2'>Cancel</button>
					</div>
				</div>
			</div>
			{/* <Autocomplete /> */}
		</>
	);
};

export default TransactionForm;
