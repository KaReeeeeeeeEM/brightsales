/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { FaExpandAlt, FaExpand, FaTachometerAlt, FaChartBar, FaChartPie, FaBoxOpen, FaCoins, FaFilter } from 'react-icons/fa'

function SideNav({isCollapsed,setIsCollapsed,selected,setSelected}) {
    
  return (
    <div className={`${isCollapsed ? 'items-center' : 'items-end'} p-2 bg-gray-700 dark:bg-primary-dark text-primary-light flex flex-col transition-all ease-in-out duration-700 h-full shadow-lg`}>
        <span onClick={() => setIsCollapsed(!isCollapsed)} className='w-12 h-8 mr-2 hidden md:flex items-center justify-center border rounded cursor-pointer'>
            {isCollapsed ? <FaExpandAlt /> : <FaExpand />}
        </span>

        {/* other links */}
        <div className='mt-8 w-full flex flex-col'>
            <span>
                <span onClick={() => setSelected('Dashboard')} className={`flex items-center cursor-pointer ${!isCollapsed ? 'justify-start' : 'justify-center'} px-4 py-2 text-sm ${selected === 'Dashboard'? 'bg-accent-gray dark:bg-primary-glass text-accent-darkGray dark:text-primary-light' : '' } hover:bg-primary-glass hover:text-accent-gray transition-all ease-in-out duration-700 rounded`}>
                    <FaTachometerAlt className={`text-sm md:text-md lg:text-lg ${!isCollapsed ? 'md:mr-2' : ''}`} />
                    <span className='hidden md:block'> {!isCollapsed ? 'Dashboard' : ''} </span>
                </span>
            </span>

            <span className='mt-4'>
                <span onClick={() => setSelected('Stock')} className={`flex items-center cursor-pointer ${!isCollapsed ? 'justify-start' : 'justify-center'} px-4 py-2 text-sm ${selected === 'Stock'? 'bg-accent-gray dark:bg-primary-glass text-accent-darkGray dark:text-primary-light' : '' } hover:bg-primary-glass hover:text-accent-gray transition-all ease-in-out duration-700 rounded`}>
                    <FaBoxOpen className={`text-sm md:text-md lg:text-lg ${!isCollapsed ? 'md:mr-2' : ''}`} />
                    <span className='hidden md:block'> {!isCollapsed ? 'Stock Manager' : ''} </span>
                </span>
            </span>

            <span className='mt-4'>
                <span onClick={() => setSelected('Categories')} className={`flex items-center cursor-pointer ${!isCollapsed ? 'justify-start' : 'justify-center'} px-4 py-2 text-sm ${selected === 'Categories'? 'bg-accent-gray dark:bg-primary-glass text-accent-darkGray dark:text-primary-light' : '' } hover:bg-primary-glass hover:text-accent-gray transition-all ease-in-out duration-700 rounded`}>
                    <FaChartPie className={`text-sm md:text-md lg:text-lg ${!isCollapsed ? 'md:mr-2' : ''}`} />
                    <span className='hidden md:block'> {!isCollapsed ? 'Categories' : ''} </span>
                </span>
            </span>

            <span className='mt-4'>
                <span onClick={() => setSelected('Expenses')} className={`flex items-center cursor-pointer ${!isCollapsed ? 'justify-start' : 'justify-center'} px-4 py-2 text-sm ${selected === 'Expenses'? 'bg-accent-gray dark:bg-primary-glass text-accent-darkGray dark:text-primary-light' : '' } hover:bg-primary-glass hover:text-accent-gray transition-all ease-in-out duration-700 rounded`}>
                    <FaCoins className={`text-sm md:text-md lg:text-lg ${!isCollapsed ? 'md:mr-2' : ''}`} />
                    <span className='hidden md:block'> {!isCollapsed ? 'Expense Tracker' : ''} </span>
                </span>
            </span>

            <span className='mt-4'>
                <span onClick={() => setSelected('Sales')} className={`flex items-center cursor-pointer ${!isCollapsed ? 'justify-start' : 'justify-center'} px-4 py-2 text-sm ${selected === 'Sales'? 'bg-accent-gray dark:bg-primary-glass text-accent-darkGray dark:text-primary-light' : '' } hover:bg-primary-glass hover:text-accent-gray transition-all ease-in-out duration-700 rounded`}>
                    <FaChartBar className={`text-sm md:text-md lg:text-lg ${!isCollapsed ? 'md:mr-2' : ''}`} />
                    <span className='hidden md:block'> {!isCollapsed ? 'Sales Recorder' : ''} </span>
                </span>
            </span>

            <span className='mt-4'>
                <span onClick={() => setSelected('Filter')} className={`flex items-center cursor-pointer ${!isCollapsed ? 'justify-start' : 'justify-center'} px-4 py-2 text-sm ${selected === 'Filter'? 'bg-accent-gray dark:bg-primary-glass text-accent-darkGray dark:text-primary-light' : '' } hover:bg-primary-glass hover:text-accent-gray transition-all ease-in-out duration-700 rounded`}>
                    <FaFilter className={`text-sm md:text-md lg:text-lg ${!isCollapsed ? 'md:mr-2' : ''}`} />
                    <span className='hidden md:block'> {!isCollapsed ? 'Super Filter' : ''} </span>
                </span>
            </span>
        </div>
    </div>
  )
}

export default SideNav