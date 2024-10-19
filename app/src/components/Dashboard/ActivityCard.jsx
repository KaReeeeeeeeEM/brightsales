/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { FaAngleDoubleRight, FaAngleDown, FaAngleUp, FaChartPie, FaCoins, FaExchangeAlt, FaStackOverflow, FaUps } from 'react-icons/fa';

function ActivityCard({title,activity,date}) {
  
  const setIcon = (title) => {
    const act = title.split(' ');

    if(act[0].toLowerCase() === "stock"){
      return <FaStackOverflow className='w-full h-full rounded-full' />
    } else if(act[0].toLowerCase().trim() === "sales"){
      return <FaExchangeAlt className='w-full h-full rounded-full' />
    }else if(act[0].toLowerCase().trim() === "expenses"){
      return <FaCoins className='w-full h-full rounded-full' />
    }else{
      return <FaChartPie className='w-full h-full rounded-full' />
    }
  }

  const setTrendIcon = (title) => {
    const act = title.split(' ');

    if(act[1].toLowerCase() === "added"){
      return <FaAngleUp className='w-full h-full rounded-full text-green-500' />
    } else if(act[1].toLowerCase().trim() === 'removed' || act[1].toLowerCase().trim() === 'included'){
       return <FaAngleDoubleRight className='w-full h-full rounded-full text-orange-500' />
    } else {
      return <FaAngleDown className='w-full h-full rounded-full text-red-500' />
    }
  }

   // Utility function to calculate time difference
   const timeSince = (timestamp) => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const differenceInMs = now - commentDate;

    const minutes = Math.floor(differenceInMs / (1000 * 60));
    const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
    const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };
  return (
    <span className='p-2 w-[20rem] flex flex-col h-auto rounded-lg bg-primary-light dark:bg-primary-glass mr-4 shrink-0'>
      <span className='px-2 flex items-center w-full h-2/3 rounded-lg'>
        <span className={`w-8 h-8 rounded-full border-2 border-accent-darkGray ${title.split(' ')[1].toLowerCase().trim() === 'added' ? 'text-green-800' : (title.split(' ')[1].toLowerCase().trim() === 'removed' || title.split(' ')[1].toLowerCase().trim() === 'included' ? 'text-orange-800' : 'text-red-800')}`}>
            {setIcon(title)}
        </span>
        <span className={`ml-2 mt-2 text-sm ${title.split(' ')[1].toLowerCase().trim() === 'added' ? 'text-green-500' : (title.split(' ')[1].toLowerCase().trim() === 'removed' || title.split(' ')[1].toLowerCase().trim() === 'included' ? 'text-orange-500' : 'text-red-500')}`}>
          {title}
        </span>
      </span>
      <span className='w-full flex items-center my-2 px-4 text-sm rounded-lg'>
          <span className='w-8 h-8 mr-2'>{setTrendIcon(title)}</span>
          {activity}
      </span>
      <span className='self-end text-xs mt-2'>
        {timeSince(date)}
      </span>
    </span>
  )
}

export default ActivityCard