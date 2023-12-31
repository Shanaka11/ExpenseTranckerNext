'use client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import TransactionForm from './TransactionForm';
import Input from '../Input';
import { useState } from 'react';
import { Tag } from '@/server/models/Tag';

type FormInputs = {
	amount: number;
};

type DashboardTransactionFormProps = {
	tags?: Tag[];
};
const DashboardTransactionForm: React.FC<DashboardTransactionFormProps> = ({
	tags,
}) => {
	const [amount, setAmount] = useState<number>(0);
	const { control, handleSubmit, reset } = useForm<FormInputs>({
		defaultValues: {
			amount: 0,
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
				options={tags}
				hideicon={true}
			/>
		</>
	);
};

export default DashboardTransactionForm;
