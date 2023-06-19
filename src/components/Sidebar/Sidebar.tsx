'use client'
import React, { useState } from 'react'
import SidebarItem from './SidebarItem'
import MenuIcon from '../Icons/MenuIcon'
import DashboardIcon from '../Icons/DashboardIcon'
import TransactionIcon from '../Icons/TransactionIcon'
import TagIcon from '../Icons/TagIcon'
import CloseIcon from '../Icons/CloseIcon'

const Sidebar = () => {

    const [ size, setSize ] = useState<'OPEN' | 'CLOSE'>('CLOSE')

    const handleMenuClose = () => {
        console.log('Close')
        setSize('CLOSE')
    }

    const handleMenuOpen = () => {
        setSize('OPEN')
    }

    return (
        <>
            <button 
                className='absolute z-1 md:hidden top-2 left-1 bg-white border border-slate-300 rounded-full'
                onClick={handleMenuOpen}
            >
                <MenuIcon />
            </button>
            {   
                size === 'OPEN' && 
                <div 
                    className='absolute top-0 z-2 h-screen w-screen bg-slate-900 opacity-80 cursor-pointer md:hidden'
                    onClick={handleMenuClose}
                />
            }
            <nav className={`md:h-[calc(100vh-48px)] h-screen absolute top-0 z-3 md:translate-x-0 md:z-0 md:relative md:flex-1 w-60 px-8 flex flex-col bg-white ${size === 'CLOSE' && '-translate-x-full'} transition-transform`}>
                <button 
                    className='h-9 w-9 md:hidden absolute top-1 right-1'
                    onClick={handleMenuClose}
                >
                    <CloseIcon classname='fill-slate-400 hover:fill-slate-950'/>
                </button>
                <SidebarItem
                    href='/'
                    title='Dashboard'
                    icon={<DashboardIcon />}
                />
                <SidebarItem
                    href='/transactions'
                    title='Transactions'
                    icon={<TransactionIcon />}
                />
                <SidebarItem
                    href='/tags'
                    title='Tags'
                    icon={<TagIcon />}
                />
            </nav>
        </>
    )
}

export default Sidebar