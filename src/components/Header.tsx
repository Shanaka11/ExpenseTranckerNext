import { SignedIn, UserButton, SignedOut, SignInButton } from '@clerk/nextjs';
import React from 'react';
import Button from './Button';
import DashboardIcon from './Icons/DashboardIcon';

const Header = () => {
	return (
		<div className='flex h-12 items-center border-b border-slate-300 bg-white pl-10 pr-1 md:px-8'>
			{/* Logo */}
			<a href='/'>
				<h1 className='font-bold text-blue-500'>Expense Tracker</h1>
			</a>
			{/* Sign in, Logout, Avatar */}
			<SignedIn>
				<div className='ml-auto'>
					<UserButton />
				</div>
			</SignedIn>
			<SignedOut>
				<div className='ml-auto flex gap-2'>
					<SignInButton mode='modal'>
						<button className='w-fit rounded-2xl bg-blue-500 p-1 px-3 py-2 text-xs font-semibold uppercase text-slate-50 duration-300 ease-in hover:bg-blue-600'>
							Sign in
						</button>
					</SignInButton>
					<SignInButton mode='modal'>
						<button className='w-fit rounded-2xl bg-transparent p-1 px-3 py-2 text-xs font-semibold uppercase text-blue-400 duration-300 hover:bg-blue-500 hover:text-white'>
							Try for free
						</button>
					</SignInButton>
				</div>
			</SignedOut>
		</div>
	);
};

export default Header;
