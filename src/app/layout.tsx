import { ClerkProvider, SignInButton } from '@clerk/nextjs'
import './globals.css'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs/app-beta'
import Header from '@/components/Header'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Expense Tracker',
  description: 'Keep track of your expenses, Powered by five12days',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          {/* Header */}
          <Header />
          {/* Sidebar should be shown on larger screen and should be an overlay on smaller screens */}
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
