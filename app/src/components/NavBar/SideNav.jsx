/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { FaExpandAlt, FaExpand, FaTachometerAlt, FaChartBar, FaFileAlt, FaBoxOpen } from 'react-icons/fa'

function SideNav({isCollapsed,setIsCollapsed,selected,setSelected}) {
    
  return (
    <div className={`${isCollapsed ? 'items-center' : 'items-end'} p-2 bg-primary-dark text-primary-light flex flex-col transition-all ease-in-out duration-700 h-full shadow-lg`}>
        <span onClick={() => setIsCollapsed(!isCollapsed)} className='w-12 h-8 mr-2 hidden md:flex items-center justify-center border rounded cursor-pointer'>
            {isCollapsed ? <FaExpandAlt /> : <FaExpand />}
        </span>

        {/* other links */}
        <div className='mt-8 w-full flex flex-col'>
            <span>
                <span onClick={() => setSelected('Dashboard')} className={`flex items-center cursor-pointer ${!isCollapsed ? 'justify-start' : 'justify-center'} px-4 py-2 text-sm ${selected === 'Dashboard'? 'bg-[#2f2f2f] text-primary-light' : '' } hover:bg-[#2f2f2f] hover:text-accent-gray transition-all ease-in-out duration-700 rounded`}>
                    <FaTachometerAlt className={`text-sm md:text-md lg:text-lg ${!isCollapsed ? 'md:mr-2' : ''}`} />
                    <span className='hidden md:block'> {!isCollapsed ? 'Dashboard' : ''} </span>
                
                </span>
            </span>

            <span className='mt-4'>
                <span onClick={() => setSelected('Stock')} className={`flex items-center cursor-pointer ${!isCollapsed ? 'justify-start' : 'justify-center'} px-4 py-2 text-sm ${selected === 'Stock'? 'bg-[#2f2f2f] text-primary-light' : '' } hover:bg-[#2f2f2f] hover:text-accent-gray transition-all ease-in-out duration-700 rounded`}>
                    <FaBoxOpen className={`text-sm md:text-md lg:text-lg ${!isCollapsed ? 'md:mr-2' : ''}`} />
                    <span className='hidden md:block'> {!isCollapsed ? 'Stock Manager' : ''} </span>
                
                </span>
            </span>

            <span className='mt-4'>
                <span onClick={() => setSelected('Sales')} className={`flex items-center cursor-pointer ${!isCollapsed ? 'justify-start' : 'justify-center'} px-4 py-2 text-sm ${selected === 'Sales'? 'bg-[#2f2f2f] text-primary-light' : '' } hover:bg-[#2f2f2f] hover:text-accent-gray transition-all ease-in-out duration-700 rounded`}>
                    <FaChartBar className={`text-sm md:text-md lg:text-lg ${!isCollapsed ? 'md:mr-2' : ''}`} />
                    <span className='hidden md:block'> {!isCollapsed ? 'Sales' : ''} </span>
                
                </span>
            </span>

            <span className='mt-4'>
                <span onClick={() => setSelected('Summary')} className={`flex items-center cursor-pointer ${!isCollapsed ? 'justify-start' : 'justify-center'} px-4 py-2 text-sm ${selected === 'Summary'? 'bg-[#2f2f2f] text-primary-light' : '' } hover:bg-[#2f2f2f] hover:text-accent-gray transition-all ease-in-out duration-700 rounded`}>
                    <FaFileAlt className={`text-sm md:text-md lg:text-lg ${!isCollapsed ? 'md:mr-2' : ''}`} />
                    <span className='hidden md:block'> {!isCollapsed ? 'Business Summary' : ''} </span>
                
                </span>
            </span>
        </div>
    </div>
  )
}

export default SideNav