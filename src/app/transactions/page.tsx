import { SearchParams } from '@/ServerServices/SearchParamType';
import { getTagsService } from '@/ServerServices/ServerTagServices';
import { getTransactionsService } from '@/ServerServices/ServerTransactionServices';
import TransactionFilterForm from '@/components/Forms/TransactionFilterForm';
import TransactionForm from '@/components/Forms/TransactionForm';
import TableAction from '@/components/Table/TableAction';
import TransactionTable from '@/components/TransactionTable';

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
	const [transactions, tags] = await Promise.all([
		getTransactionsService({
			searchParams: searchParams,
		}),
		getTagsService({}),
	]);

	return (
		<>
			{/* // Container */}
			<div className='grid h-full w-full grid-cols-none grid-rows-[50px_60px_1fr] items-center gap-2'>
				{/* Title */}
				<h1 className='col-span-2 text-3xl font-bold'>Transactions</h1>
				{/* Action Section */}
				<TableAction
					baseUrl='transactions'
					searchParams={searchParams}
					FilterDialog={TransactionFilterForm}
				>
					<TransactionForm title='Add' options={tags} />
				</TableAction>
				{/* // Table Container */}
				<TransactionTable transactions={transactions} tags={tags} />
			</div>
		</>
	);
};

export default page;
