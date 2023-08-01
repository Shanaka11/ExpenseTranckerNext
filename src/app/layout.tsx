import { ClerkProvider, SignInButton } from '@clerk/nextjs';
import './globals.css';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs/app-beta';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Toaster } from 'react-hot-toast';
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
			<body className='grid h-screen grid-rows-[48px_1fr] bg-slate-100'>
				<ClerkProvider>
					<Toaster />
					{/* Header */}
					<div className='col-span-2'>
						<Header />
					</div>
					{/* Sidebar should be shown on larger screen and should be an overlay on smaller screens */}
					{/* <div className='md:grid md:grid-cols-[240px_1fr]'> */}
					{/* <Sidebar /> */}
					{/* <div className='col-span-2 overflow-y-scroll px-4 py-4 md:col-span-1 md:p-4 md:px-10'> */}
					{children}
					{/* </div> */}
					{/* </div> */}
				</ClerkProvider>
			</body>
		</html>
	);
}
