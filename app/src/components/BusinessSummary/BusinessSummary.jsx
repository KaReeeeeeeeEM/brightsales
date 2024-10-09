import React from 'react'
import { FaFileAlt } from 'react-icons/fa'

function BusinessSummary() {
  return (
    <div>
         {/* title */}
         <span className="mt-2 md:mt-0 flex items-center text-primary-dark dark:text-primary-light font-bold text-lg md:text-xl lg:text-2xl">
            <FaFileAlt className="mr-2" />
             Business Summary
        </span>
    </div>
  )
}

export default BusinessSummary