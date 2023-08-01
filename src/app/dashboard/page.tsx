import {
	getTransactionSummary,
	getTransactionsService,
} from '@/ServerServices/ServerTransactionServices';
import ExpenseDistributionChart from '@/components/ExpenseDistributionChart';
import DashboardTransactionForm from '@/components/Forms/DashboardTransactionForm';
import MonthlyBalanceChart from '@/components/MonthlyBalanceChart';
import SummaryContainer from '@/components/SummaryContainer';
import TransactionTable from '@/components/TransactionTable';

export default async function Home() {
	const [transactions, summary] = await Promise.all([
		getTransactionsService({}),
		getTransactionSummary(),
	]);

	return (
		<div className='grid place-items-center gap-4 md:h-[calc(100vh-48px)] md:grid-cols-4 md:grid-rows-[140px_140px_400px_1fr] md:gap-10 lg:grid-rows-[140px_550px_1fr]'>
			<div className='col-span-2 flex h-28 w-full flex-col justify-evenly align-middle md:h-full lg:col-span-1'>
				<DashboardTransactionForm />
			</div>
			<SummaryContainer transactions={transactions} />

			<div className='col-span-2 h-fit w-full rounded-lg bg-white px-4 py-2  md:h-full'>
				<ExpenseDistributionChart summary={summary.tag} />
			</div>
			<div className='col-span-2 h-full w-full rounded-lg bg-white px-4  py-2'>
				<MonthlyBalanceChart summary={summary.month} />
			</div>
			<div className='col-span-2 h-full w-full md:col-span-4'>
				<TransactionTable
					transactions={transactions?.slice(0, 4) ?? []}
					readonly={true}
					tags={[]}
				/>
			</div>
		</div>
	);
}