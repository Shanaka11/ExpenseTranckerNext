import React from 'react';

// This form will be used to create and edit transactions
const TransactionForm = () => {
	/* Then Add the form */
	return (
		<>
			{/* Overlay */}
			<div className='absolute left-0 top-0 z-10 h-screen w-screen cursor-pointer bg-slate-800/75' />
			<div className='absolute right-0 top-0 z-20 grid h-screen w-screen grid-rows-[60px_1fr_60px] bg-white p-2 md:w-96'>
				{/* Dialog Header (Title and Close Button) */}
				<div>
					<h1>Add New Transaction</h1>
					{/* This button is common to all dialogs so keep this in the common component */}
					<button>X</button>
				</div>
				{/* Dialog Content */}
				<form className='p-0'>
					<input
						type='number'
						placeholder='Transaction Amount'
						defaultValue={123}
						className='w-full'
					/>
					<input type='text' placeholder='Description' className='w-full' />
				</form>
				{/* Dialog Action Button (Save / Close etc) */}
				<div className='flex'>
					<button>Add Another</button>
					{/* Default button Group (Ok, Cancel) */}
					<div className='ml-auto flex'>
						<button>Add</button>
						<button className='ml-2'>Cancel</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default TransactionForm;
