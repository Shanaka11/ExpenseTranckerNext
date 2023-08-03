import BalanceTrendAnalysisIcon from '@/components/Icons/BalanceTrendAnalysisIcon';
import CategoryIcon from '@/components/Icons/CategoryIcon';
import CustomizeIcon from '@/components/Icons/CustomizeIcon';
import ExpenseOverviewIcon from '@/components/Icons/ExpenseOverviewIcon';
import FinanciallyInformedIcon from '@/components/Icons/FinanciallyInformedIcon';
import IncomeBreakdownIcon from '@/components/Icons/IncomeBreakdownIcon';
import InsightsIcon from '@/components/Icons/InsightsIcon';
import PieChartIcon from '@/components/Icons/PieChartIcon';
import RealTimeUpdateIcon from '@/components/Icons/RealTimeUpdateIcon';
import RegisterTransactionIcon from '@/components/Icons/RegisterTransactionIcon';
import TopTransactionIcon from '@/components/Icons/TopTransactionIcon';
import VisualizeIcon from '@/components/Icons/VisualizeIcon';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Image from 'next/image';
export default function Home() {
	const date = new Date();

	return (
		<div className='col-span-2 overflow-x-auto bg-white'>
			{/* Hero */}
			<section className='relative col-span-2 grid h-96 place-items-center md:h-[35rem]'>
				<Image
					src='https://five12daysgeneral.s3.ap-southeast-1.amazonaws.com/Expense/35cc357a76a5471b977d99e93dcdad97.jpg'
					alt='hero'
					fill
					className='absolute'
					style={{
						objectFit: 'cover',
					}}
				/>
				<div className='z-10 px-10 md:px-8'>
					<h1
						className='text-6xl font-semibold text-white'
						style={{ textShadow: '-7px 4px 5px black' }}
					>
						Take Control of Your Finances
					</h1>
					<div className='mt-3 flex gap-1 md:justify-center'>
						<SignedIn>
							<a
								className='w-fit cursor-pointer rounded-2xl bg-blue-500 p-4 text-sm font-semibold uppercase text-slate-50 duration-300 ease-in hover:bg-blue-600'
								href='/dashboard'
							>
								Vist Your Dashboard
							</a>
						</SignedIn>
						<SignedOut>
							<SignInButton mode='modal'>
								<button className='w-fit rounded-2xl bg-blue-500 p-4 text-sm font-semibold uppercase text-slate-50 duration-300 ease-in hover:bg-blue-600'>
									Vist Dashboard
								</button>
							</SignInButton>
							<SignInButton mode='modal'>
								<button className='w-fit rounded-2xl bg-transparent p-4  text-sm font-semibold uppercase text-white duration-300 hover:bg-blue-500'>
									Try for free
								</button>
							</SignInButton>
						</SignedOut>
					</div>
				</div>
			</section>
			{/* Features */}
			<section className='bg-blue-400 py-5'>
				<h2 className='pb-5 text-center text-3xl font-semibold text-white'>
					Features
				</h2>
				<div className='grid grid-cols-12 place-items-center gap-5 px-8 md:gap-10 lg:px-44'>
					<div className='col-span-12 w-full overflow-hidden rounded-lg bg-white drop-shadow md:col-span-6 lg:col-span-4 lg:w-[350px]'>
						<div className='relative h-72 min-w-[320px] md:min-w-[370px]'>
							<Image
								src='https://five12daysgeneral.s3.ap-southeast-1.amazonaws.com/Expense/TransactionsTab.jpeg'
								alt='Quick Transactions'
								fill
								style={{
									objectFit: 'cover',
								}}
								className='rounded-t-lg'
							/>
						</div>
						<h3 className='my-4 text-center text-xl font-semibold'>
							Quick Transactions
						</h3>
						<ul className='flex flex-col gap-4 px-4 pb-5 md:px-10'>
							<li className='flex place-items-center gap-4'>
								<RegisterTransactionIcon />
								<p>Transaction Recording</p>
							</li>
							<li className='flex place-items-center gap-4'>
								<CategoryIcon />
								<p>Better Organization</p>
							</li>
							<li className='flex place-items-center gap-4'>
								<CustomizeIcon />
								<p>Customizable Tags</p>
							</li>
							<li className='flex place-items-center gap-4'>
								<RealTimeUpdateIcon />
								<p>Real-time Updates</p>
							</li>
						</ul>
					</div>
					<div className='col-span-12 w-full overflow-hidden rounded-lg bg-white drop-shadow md:col-span-6 lg:col-span-4 lg:w-[350px]'>
						<div className='relative h-72 min-w-[320px] md:min-w-[370px]'>
							<Image
								src='https://five12daysgeneral.s3.ap-southeast-1.amazonaws.com/Expense/AddTransactionMobile.jpeg'
								alt='Quick Transactions'
								fill
								style={{
									objectFit: 'cover',
								}}
								className='rounded-t-lg'
							/>
						</div>
						<h3 className='my-4 text-center text-xl font-semibold'>
							Financial Snapshot
						</h3>
						<ul className='flex flex-col gap-4 px-4 pb-5 md:px-10'>
							<li className='flex place-items-center gap-4'>
								<IncomeBreakdownIcon />
								<p>See Your Income Breakdown</p>
							</li>
							<li className='flex place-items-center gap-4'>
								<ExpenseOverviewIcon />
								<p>Get an Expense Overview</p>
							</li>
							<li className='flex place-items-center gap-4'>
								<TopTransactionIcon />
								<p>View Top Transactions</p>
							</li>
							<li className='flex place-items-center gap-4'>
								<PieChartIcon />
								<p>Explore Spending by Tags</p>
							</li>
						</ul>
					</div>
					<div className='col-span-12 w-full overflow-hidden rounded-lg bg-white drop-shadow lg:col-span-4 lg:w-[350px]'>
						<div className='relative h-72 w-full'>
							<Image
								src='https://five12daysgeneral.s3.ap-southeast-1.amazonaws.com/Expense/DashboardPC.jpg'
								alt='Quick Transactions'
								fill
								style={{
									objectFit: 'cover',
								}}
								className='rounded-t-lg'
							/>
						</div>
						<h3 className='my-4 text-center text-xl font-semibold'>
							Financial Overview Hub
						</h3>
						<ul className='flex flex-col gap-4 px-4 pb-5 md:px-10'>
							<li className='flex place-items-center gap-4'>
								<FinanciallyInformedIcon />
								<p>Stay Financially Informed</p>
							</li>
							<li className='flex place-items-center gap-4'>
								<VisualizeIcon />
								<p>Visualize Your Spending</p>
							</li>
							<li className='flex place-items-center gap-4'>
								<BalanceTrendAnalysisIcon />
								<p>Balance Trend Analysis</p>
							</li>
							<li className='flex place-items-center gap-4'>
								<InsightsIcon />
								<p>Quick Balance Insights</p>
							</li>
						</ul>
					</div>
				</div>
			</section>
			{/* Responsive Design */}
			<section className='py-5'>
				<h2 className='pb-5 text-center text-3xl font-semibold text-blue-400'>
					Responsive Design
				</h2>
				<div className='relative h-48 w-full md:h-96 lg:h-[32rem]'>
					<Image
						src='https://five12daysgeneral.s3.ap-southeast-1.amazonaws.com/Expense/ResponsiveImage.png'
						alt='Responsive Design'
						fill
						style={{
							objectFit: 'contain',
						}}
					/>
				</div>
			</section>
			{/* Footer */}
			<footer className='bg-blue-400 py-5'>
				<p className='text-center text-white'>
					<span>&copy;</span> {date.getFullYear()} Five12Days. All rights
					reserved.
				</p>
			</footer>
		</div>
	);
}
