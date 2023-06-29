'use client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import TransactionForm from './TransactionForm';
import Input from '../Input';
import { useState } from 'react';

type FormInputs = {
	amount: number | string;
};

const DashboardTransactionForm = () => {
	const [amount, setAmount] = useState(0);
	const { control, handleSubmit, reset } = useForm<FormInputs>({
		defaultValues: {
			amount: '',
		},
	});

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		console.log(data);
		reset();
	};

	return (
		<>
			{/* Transaction Form : Temp */}
			<TransactionForm initialAmount={amount} />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex h-28 w-full flex-col justify-evenly align-middle md:col-span-2 md:h-full lg:col-span-1'
			>
				<Controller
					name='amount'
					control={control}
					render={({ field }) => (
						<Input
							className='text-right'
							placeholder='New Transaction Amount'
							id='dashboardTransactionAmount'
							type='number'
							autoFocus
							{...field}
						/>
					)}
				/>
				<button
					className='cursor-pointer rounded-lg bg-blue-400 p-1 text-white '
					type='submit'
				>
					Add Transaction
				</button>
			</form>
		</>
	);
};

export default DashboardTransactionForm;
