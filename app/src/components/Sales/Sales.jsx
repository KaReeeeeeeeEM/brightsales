import React from 'react'
import { FaChartBar } from 'react-icons/fa'

function Sales() {
  return (
    <div>
         {/* title */}
         <span className="mt-2 md:mt-0 flex items-center text-primary-dark dark:text-primary-light font-bold text-lg md:text-xl lg:text-2xl">
            <FaChartBar className="mr-2" />
             Sales
        </span>
    </div>
  )
}

export default Sales