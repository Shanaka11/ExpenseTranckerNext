'use client';
import React, { useState } from 'react';
import SidebarItem from './SidebarItem';
import MenuIcon from '../Icons/MenuIcon';
import DashboardIcon from '../Icons/DashboardIcon';
import TransactionIcon from '../Icons/TransactionIcon';
import TagIcon from '../Icons/TagIcon';
import CloseIcon from '../Icons/CloseIcon';
import AnalyticsIcon from '../Icons/AnalyticsIcon';

const Sidebar = () => {
	const [size, setSize] = useState<'OPEN' | 'CLOSE'>('CLOSE');

	const handleMenuClose = () => {
		setSize('CLOSE');
	};

	const handleMenuOpen = () => {
		setSize('OPEN');
	};

	return (
		<>
			<button
				className='z-1 absolute left-1 top-2 rounded-full border border-slate-300 bg-white md:hidden'
				onClick={handleMenuOpen}
			>
				<MenuIcon />
			</button>
			{size === 'OPEN' && (
				<div
					className='fixed top-0 z-10 h-screen w-screen cursor-pointer bg-slate-900 opacity-80 md:hidden'
					onClick={handleMenuClose}
				/>
			)}
			<nav
				className={`fixed top-0 z-20 flex h-screen w-60 flex-col bg-white px-8 md:relative md:z-0 md:h-[calc(100vh-48px)] md:flex-1 md:translate-x-0 ${
					size === 'CLOSE' && '-translate-x-full'
				} transition-transform`}
			>
				<button
					className='absolute right-1 top-1 h-9 w-9 md:hidden'
					onClick={handleMenuClose}
				>
					<CloseIcon />
				</button>
				<SidebarItem
					href='/dashboard'
					title='Dashboard'
					icon={<DashboardIcon />}
					handleClick={handleMenuClose}
				/>
				<SidebarItem
					href='/dashboard/transactions'
					title='Transactions'
					icon={<TransactionIcon />}
					handleClick={handleMenuClose}
				/>
				<SidebarItem
					href='/dashboard/tags'
					title='Tags'
					icon={<TagIcon />}
					handleClick={handleMenuClose}
				/>
				<SidebarItem
					href='/dashboard/analytics'
					title='Analytics'
					icon={<AnalyticsIcon />}
					handleClick={handleMenuClose}
				/>
			</nav>
		</>
	);
};

export default Sidebar;
