/* eslint-disable react/prop-types */
import { useState } from 'react'
import ThemeToggler from '../ThemeToggler/ThemeToggler'
import { FaLaptop, FaMoon, FaSun } from 'react-icons/fa';

function TopAppBar({theme, toggleTheme}) {
  const [toggleProfile, setToggleProfile] = useState(false);
  const handleToggleProfile = () => setToggleProfile(!toggleProfile)
  return (
    <div>
        <nav className="fixed w-screen flex items-center justify-between bg-primary-dark text-white dark:text-gray-200 shadow-lg py-1 md:py-0">
          <span className="flex items-center font-bold text-2xl">
            <img src='/logo-dark.png' alt='logo' className='w-12 h-12 lg:w-16 lg:h-16' />
         </span>
          <div className="flex items-center px-4">
            <span onClick={handleToggleProfile} className='relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent-darkGray border-2 border-accent-gray cursor-pointer ml-2'>
                <img src='/logo.png' alt='profile' className='w-full h-full rounded-full object-cover' />
            </span>

            {/* profile block */}
            {toggleProfile &&
            <span className={`flex flex-col items-center justify-center transform ${toggleProfile ? 'w-48 md:w-52 lg:w-56 translate-y-44 -translate-x-36 opacity-1' : 'w-0 h-0 translate-x-0 translate-y-0 opacity-0'}  h-auto absolute  bg-primary-dark dark:bg-[#2f2f2f] p-2 rounded-lg transition-all ease-in-out duration-700 z-10`}>
                <span className='w-12 h-12 border-2 border-accent-darkGray bg-accent-darkGray rounded-full'>
                    <img src='/logo.png' alt='profile' className='w-full h-full rounded-full object-cover' />
                </span>
                <span className='text-sm mt-2 font-bold'>
                    Kareem
                </span>

                <hr className='w-full my-2 rounded bg-[#2f2f2f] dark:bg-accent-darkGray' />
                <span className='text-xs text-gray-300 mb-2'>
                  Theme
                </span>
                <span className='w-full flex items-center justify-between mb-4'>
                    <span onClick={theme !== 'light' ? toggleTheme : ''} className={`w-1/4 text-sm cursor-pointer ${theme === 'light' ? 'bg-primary-light text-primary-dark' : ''} hover:bg-primary-light hover:text-primary-dark transition ease-in-out duration-700 flex items-center justify-center h-8 bg-accent-darkGray rounded-lg`}>
                        <FaSun />
                    </span>
                    <span onClick={theme !== 'dark' ? toggleTheme : ''} className={`w-1/4 text-sm cursor-pointer ${theme === 'dark' ? 'bg-primary-light text-primary-dark' : ''} hover:bg-primary-light hover:text-primary-dark transition ease-in-out duration-700 flex items-center justify-center h-8 bg-accent-darkGray rounded-lg`}>
                        <FaMoon />
                    </span>
                    <span onClick={theme !== 'system' ? toggleTheme : ''} className={`w-1/4 text-sm cursor-pointer ${theme !== 'light' && theme !== 'dark' ? 'bg-primary-light text-primary-dark' : ''} hover:bg-primary-light hover:text-primary-dark transition ease-in-out duration-700 flex items-center justify-center h-8 bg-accent-darkGray rounded-lg`}>
                        <FaLaptop />
                    </span>
                </span>

                <button className='mt-2 text-sm w-full dark:bg-primary-dark hover:bg-[#2f2f2f] '>
                    Change Profile
                </button>
                <button className='mt-2 text-sm w-full border-2 dark:border-primary-light hover:bg-primary-light hover:text-primary-dark transition-all ease-in-out duration-700'>
                    Login
                </button>
            </span>}
          </div>
        </nav>
    </div>
  )
}

export default TopAppBar