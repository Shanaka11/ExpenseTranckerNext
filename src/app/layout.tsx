import { ClerkProvider, SignInButton } from '@clerk/nextjs';
import './globals.css';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs/app-beta';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Expense Tracker',
	description: 'Keep track of your expenses, Powered by five12days',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className='flex h-screen flex-col bg-slate-100'>
				<ClerkProvider>
					{/* Header */}
					<Header />
					{/* Sidebar should be shown on larger screen and should be an overlay on smaller screens */}
					<div className='md:grid md:grid-cols-[240px_1fr]'>
						<Sidebar />
						<div className='overflow-hidden px-10 py-4 md:p-4'>{children}</div>
					</div>
				</ClerkProvider>
			</body>
		</html>
	);
}
