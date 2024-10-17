import React from 'react'
import { FaBoxOpen } from 'react-icons/fa'

function StockManager() {
  return (
    <div className='w-full'>
        {/* title */}
        <span className="mt-2 md:mt-0 flex items-center text-primary-dark dark:text-primary-light font-bold text-lg md:text-xl lg:text-2xl">
            <FaBoxOpen className="mr-2" />
             StockManager
        </span>

        <div className='w-full flex overflow-x-auto my-8 py-2'>
            <span className='w-full text-primary-dark dark:text-accent-darkGray text-center text-sm'>There are no stock updates currently</span>
        </div>
    </div>
  )
}

export default StockManager