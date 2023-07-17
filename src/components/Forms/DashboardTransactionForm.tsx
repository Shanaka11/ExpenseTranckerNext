'use client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import TransactionForm from './TransactionForm';
import Input from '../Input';
import { useState } from 'react';

type FormInputs = {
	amount: number | string;
};

const DashboardTransactionForm = () => {
	const [amount, setAmount] = useState<string | number>(0);
	const { control, handleSubmit, reset, getValues } = useForm<FormInputs>({
		defaultValues: {
			amount: '',
		},
	});

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		setAmount(data.amount);
		reset();
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} id='DashboardTransactionForm'>
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
			</form>
			<TransactionForm
				baseFormId={'DashboardTransactionForm'}
				initialAmount={amount}
			/>
		</>
	);
};

export default DashboardTransactionForm;
