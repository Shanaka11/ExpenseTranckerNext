import { SignIn } from '@clerk/nextjs/app-beta';
import React from 'react';

const Page = () => {
	return (
		<section className='absolute grid h-screen w-screen place-items-center bg-slate-500 py-24'>
			<SignIn />
		</section>
	);
};

export default Page;
