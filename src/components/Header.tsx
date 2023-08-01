import { SignedIn, UserButton, SignedOut, SignInButton } from '@clerk/nextjs';
import React from 'react';
import Button from './Button';
import DashboardIcon from './Icons/DashboardIcon';

const Header = () => {
	return (
		<div className='flex h-12 items-center border-b border-slate-300 bg-white px-10 md:px-8'>
			{/* Logo */}
			<h1 className='font-bold text-blue-500'>Expense Tracker</h1>
			{/* Sign in, Logout, Avatar */}
			<SignedIn>
				<div className='ml-auto'>
					<UserButton />
				</div>
			</SignedIn>
			<SignedOut>
				<SignInButton mode='modal'>
					<button className='ml-auto w-fit rounded-2xl bg-blue-500 p-1 px-3 py-2 text-xs font-semibold uppercase text-slate-50'>
						Sign in
					</button>
				</SignInButton>
			</SignedOut>
		</div>
	);
};

export default Header;
