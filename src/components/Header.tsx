import { SignedIn, UserButton, SignedOut, SignInButton } from '@clerk/nextjs'
import React from 'react'

const Header = () => {
  return (
    <div className='h-12 bg-white border-b border-slate-300 px-10 md:px-8 flex items-center'>
        {/* Logo */}
        <h1 className='font-bold text-blue-500'>Expense Tracker</h1>
        {/* Sign in, Logout, Avatar */}
        <SignedIn>
        <div className='ml-auto'>
            <UserButton/>
        </div>
        </SignedIn>
        <SignedOut>
        <SignInButton mode='modal'>
            <button className='ml-auto bg-blue-500 p-1 w-28 rounded text-slate-50 uppercase text-sm'> Sign in </button>
        </SignInButton>
        </SignedOut>
    </div>
  )
}

export default Header