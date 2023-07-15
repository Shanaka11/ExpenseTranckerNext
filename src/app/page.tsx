import Card from '@/components/Card';
import DashboardTransactionForm from '@/components/Forms/DashboardTransactionForm';

export default function Home() {
	// return (
	// 	<div className='grid grid-cols-4 place-items-center gap-10 md:grid-cols-4 lg:grid-rows-[140px_400px_1fr]'></div>
	// );
	return (
		// Grid container for mobile keep everything on a single column, spread out on other layouts
		// md:grid-cols-[240px_1fr]
		<div className='grid place-items-center gap-10 md:h-[calc(100vh-48px)] md:grid-cols-4 md:grid-rows-[140px_140px_400px_1fr] lg:grid-rows-[140px_400px_1fr]'>
			{/* Input */}
			<div className='col-span-2 flex h-28 w-full flex-col justify-evenly align-middle md:h-full lg:col-span-1'>
				<DashboardTransactionForm />
			</div>
			{/* Balance */}
			<Card />
			{/* Income */}
			<Card />
			{/* Expense */}
			<Card />
			{/* Line Chart showing the rolling balance for each day - span 2-cols on large screens if not good then hide on smaller screens*/}
			<div className='md:col-span-2'>Line Chart</div>
			{/* Bar Chart Monthly balance -span 2-cols on large screens if not good then hide on smaller screens*/}
			<div className='md:col-span-2'>Bar Chart</div>
			{/* Transaction history table show the last 5 - 10 transactions depending on screen size */}
			<div className='md:col-span-4'>Transaction history</div>
		</div>
	);
}
