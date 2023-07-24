'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface SidebarItemProps {
	href: string;
	title: string;
	icon: React.ReactNode;
	handleClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
	href,
	title,
	icon,
	handleClick,
}) => {
	const pathname = usePathname();
	return (
		<Link
			href={href}
			className='group flex h-12 w-full items-center'
			onClick={handleClick}
		>
			{icon}
			<h2
				className={`ml-3 group-hover:font-bold ${
					href === pathname && 'font-bold'
				}`}
			>
				{title}
			</h2>
		</Link>
	);
};

export default SidebarItem;
