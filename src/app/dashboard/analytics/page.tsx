import React from 'react';

const page = () => {
	return (
		// Add a from and to date picker and a button to generate report
		// Report should have , income, expesnse, balance for the period
		// Top 5 Expenses, Top Incomes
		// Chart showing Distribution By Tags, Should be able to click on a chart element and show transactions that have tags, EG/ Go to a distribution of expenses that has that tag
		// Income distribution
		// Show recurring expenses, Bills, Subscriptions Etc
		<div className='grid h-full w-full '>
			{/* Title */}
			<h1 className='col-span-2 text-3xl font-bold'>Analytics</h1>
		</div>
	);
};

export default page;
