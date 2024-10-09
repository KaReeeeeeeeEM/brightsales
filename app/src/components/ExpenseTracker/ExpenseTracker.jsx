import React from 'react'
import { FaCoins } from 'react-icons/fa'

function ExpenseTracker() {
  return (
    <div>
         {/* title */}
         <span className="mt-2 md:mt-0 flex items-center text-primary-dark dark:text-primary-light font-bold text-lg md:text-xl lg:text-2xl">
            <FaCoins className="mr-2" />
             Expense Tracker
        </span>
    </div>
  )
}

export default ExpenseTracker