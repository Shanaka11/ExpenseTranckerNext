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
		getTransactionsService(),
		getTransactionSummary(),
	]);
	return (
		// Grid container for mobile keep everything on a single column, spread out on other layouts
		// md:grid-cols-[240px_1fr]
		<div className='grid place-items-center gap-10 md:h-[calc(100vh-48px)] md:grid-cols-4 md:grid-rows-[140px_140px_400px_1fr] lg:grid-rows-[140px_550px_1fr]'>
			{/* Input */}
			<div className='col-span-2 flex h-28 w-full flex-col justify-evenly align-middle md:h-full lg:col-span-1'>
				<DashboardTransactionForm />
			</div>
			<SummaryContainer transactions={transactions} />
			{/* Line Chart showing the rolling balance for each day - span 2-cols on large screens if not good then hide on smaller screens*/}
			{/* <div className='h-full w-full rounded-lg bg-white px-4 py-2 md:col-span-2'>
				<BalanceChart transactions={transactions} />
			</div> */}
			{/* Bar Chart Monthly balance -span 2-cols on large screens if not good then hide on smaller screens*/}
			{/* <div className='md:col-span-2'>Bar Chart</div> */}
			{/* Transaction history table show the last 5 - 10 transactions depending on screen size */}

			<div className='col-span-2 h-full w-full rounded-lg bg-white px-4  py-2'>
				<ExpenseDistributionChart summary={summary} />
			</div>
			<div className='col-span-2 h-full w-full rounded-lg bg-white px-4  py-2'>
				<MonthlyBalanceChart />
			</div>
			<div className='col-span-2 h-full w-full md:col-span-4'>
				<TransactionTable
					transactions={transactions.slice(0, 4)}
					readonly={true}
					tags={[]}
				/>
			</div>
		</div>
	);
}
