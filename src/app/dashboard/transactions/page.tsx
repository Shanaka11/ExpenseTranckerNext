import { SearchParams } from '@/ServerServices/SearchParamType';
import { getTagsService } from '@/ServerServices/ServerTagServices';
import { getTransactionsService } from '@/ServerServices/ServerTransactionServices';
import TransactionFilterForm from '@/components/Forms/TransactionFilterForm';
import TransactionForm from '@/components/Forms/TransactionForm';
import TableAction from '@/components/Table/TableAction';
import TransactionTable from '@/components/TransactionTable';
import { isEmptyObject } from '../../_util/objectUtil';

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
	const [transactions, tags] = await Promise.all([
		getTransactionsService({
			count: isEmptyObject(searchParams) ? 100 : undefined,
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
					filterDialogOptions={{
						tagList: tags,
					}}
				>
					<TransactionForm title='Add' options={tags} hideicon={false} />
				</TableAction>
				{/* // Table Container */}
				<TransactionTable transactions={transactions} tags={tags} />
			</div>
		</>
	);
};

export default page;
