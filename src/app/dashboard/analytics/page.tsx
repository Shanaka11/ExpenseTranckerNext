import { SearchParams } from '@/ServerServices/SearchParamType';
import { getTransactionsService } from '@/ServerServices/ServerTransactionServices';
import AnalysisReport from '@/components/AnalysisReport';
import AnalyticDateRangeForm from '@/components/Forms/AnalyticDateRangeForm';
import React from 'react';

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
	const transactions =
		Object.keys(searchParams).length > 0
			? await getTransactionsService({
					searchParams: searchParams,
			  })
			: [];
	return (
		// Add a from and to date picker and a button to generate report
		<div className='h-full w-full '>
			{/* Title */}
			<h1 className='col-span-2 mb-4 text-3xl font-bold'>Analytics</h1>
			<AnalyticDateRangeForm
				initialFrom={searchParams.from?.split(':')[1]}
				initialTo={searchParams.to?.split(':')[1]}
			/>
			<AnalysisReport transactions={transactions} />
		</div>
	);
};

export default page;
