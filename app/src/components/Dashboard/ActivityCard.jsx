/* eslint-disable react/prop-types */
import React from 'react'

function ActivityCard({icon,title,activity}) {
  return (
    <span className='p-2 w-[20rem] flex flex-col h-[12rem] rounded-lg bg-primary-light dark:bg-primary-glass mr-4 shrink-0'>
      <span className='px-2 flex items-start space-between w-full h-2/3 rounded-lg'>
        <span className='w-12 h-12 rounded-full border-2 border-accent-darkGray'>
            {icon}
        </span>
        <span className='ml-2 mt-2'>
          {title}
        </span>
      </span>
      <span className='w-full h-1/3 rounded-lg'>
          {activity}
      </span>

    </span>
  )
}

export default ActivityCard