import React, { useState } from 'react'
import { FaBoxOpen, FaChartBar, FaChartLine, FaCoins } from 'react-icons/fa'
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function DashboardContent() {
    const [score,setScore] = useState(6.0)
        // Sample data for Line Chart (Weekly Sales)
        const lineData = {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          datasets: [
            {
              label: 'Weekly Sales (in Tsh)',
              data: [12000, 15000, 18000, 17000, 20000, 21000, 25000],
              borderColor: '#fff',
              backgroundColor: '#4b556350',
              fill: true,
              tension: 0.3,
            },
          ],
        };
      
        const lineOptions = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#ffffff',
              },
            },
            title: {
              display: true,
              text: 'Weekly Sales',
              color: '#ffffff',
            },
          },
          scales: {
            x: {
              ticks: {
                color: '#ffffff',
              },
              grid: {
                color: '#444444',
              },
            },
            y: {
              ticks: {
                color: '#ffffff',
              },
              grid: {
                color: '#444444',
              },
            },
          },
        };
      
        const doughnutData = {
          labels: ['Sales', 'Expenses'],
          datasets: [
            {
              label: 'Sales vs Expenses (in Tsh)',
              data: [120000, 20000],
              backgroundColor: ['#fff', '#4b5563'],
              hoverOffset: 4,
            },
          ],
        };
      
        const doughnutOptions = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#ffffff',
              },
            },
            title: {
              display: true,
              text: 'Sales vs Expenses',
              color: '#ffffff',
            },
          },
        };

  return (
    <div className='w-full flex flex-col items-start justify-start h-auto'>
        <span className='mt-2 md:mt-0 text-primary-dark dark:text-primary-light font-bold text-lg md:text-xl lg:text-2xl'>Dashboard</span>

        {/* cards */}
        <div className='mt-2 md:mt-8 w-full flex flex-col md:flex-row md:flex-wrap items-center justify-between'>
            {/* stock card */}
            <div className='flex flex-col w-full md:w-[49%] lg:w-[24%] h-[18vh] md:h-[12vh] lg:h-[15vh] mt-2 md:mt-4 lg:mt-0 bg-primary-dark dark:bg-[#2f2f2f] p-2 rounded-lg'>
                 <span className='flex items-center'>
                        <span className='relative w-8 h-8'>
                            <span className='absolute top-0 left-0 w-full h-full bg-[#2f2f2f] dark:bg-accent-darkGray rounded-full'></span>
                            <FaBoxOpen className='absolute top-0 left-0 w-full h-full p-2 text-accent-gray dark:text-primary-light z-10' />
                        </span>
                        <span className='ml-2 text-primary-light dark:text-accent-gray text-sm'>
                            Current Stock In Store
                        </span>
                 </span>
                 <span className='mx-6 mt-4'>
                    <span className='font-bold text-4xl text-primary-light'>
                        100
                    </span>
                    <span className='text-md text-accent-darkGray ml-1'>
                        items
                    </span> 
                </span>
            </div>

            {/* total sales card */}
            <div className='flex flex-col w-full md:w-[49%] lg:w-[24%] h-[18vh] md:h-[12vh] lg:h-[15vh] mt-2 md:mt-4 lg:mt-0 bg-primary-dark dark:bg-[#2f2f2f] p-2 rounded-lg'>
                 <span className='flex items-center'>
                        <span className='relative w-8 h-8'>
                            <span className='absolute top-0 left-0 w-full h-full bg-[#2f2f2f] dark:bg-accent-darkGray rounded-full'></span>
                            <FaChartLine className='absolute top-0 left-0 w-full h-full p-2 text-accent-gray dark:text-primary-light z-10' />
                        </span>
                        <span className='ml-2 text-primary-light dark:text-accent-gray text-sm'>
                            Total Sales Over Time
                        </span>
                 </span>
                 <span className='mx-6 mt-4'>
                    <span className='text-lg text-accent-darkGray mr-1'>
                        Tshs
                    </span> 
                    <span className='font-bold text-4xl text-primary-light'>
                        250k
                    </span>
                </span>
            </div>

            {/* weekly sales card */}
            <div className='flex flex-col w-full md:w-[49%] lg:w-[24%] h-[18vh] md:h-[12vh] lg:h-[15vh] mt-2 md:mt-4 lg:mt-0 bg-primary-dark dark:bg-[#2f2f2f] p-2 rounded-lg'>
                 <span className='flex items-center'>
                        <span className='relative w-8 h-8'>
                            <span className='absolute top-0 left-0 w-full h-full bg-[#2f2f2f] dark:bg-accent-darkGray rounded-full'></span>
                            <FaChartBar className='absolute top-0 left-0 w-full h-full p-2 text-accent-gray dark:text-primary-light z-10' />
                        </span>
                        <span className='ml-2 text-primary-light dark:text-accent-gray text-sm'>
                            Weekly Sales
                        </span>
                 </span>
                 <span className='mx-6 mt-4'>
                    <span className='text-lg text-accent-darkGray mr-1'>
                        Tshs
                    </span> 
                    <span className='font-bold text-4xl text-primary-light'>
                        120k
                    </span>
                </span>
            </div>

            {/* total expenses */}
            <div className='flex flex-col w-full md:w-[49%] lg:w-[24%] h-[18vh] md:h-[12vh] lg:h-[15vh] mt-2 md:mt-4 lg:mt-0 bg-primary-dark dark:bg-[#2f2f2f] p-2 rounded-lg'>
                 <span className='flex items-center'>
                        <span className='relative w-8 h-8'>
                            <span className='absolute top-0 left-0 w-full h-full bg-[#2f2f2f] dark:bg-accent-darkGray rounded-full'></span>
                            <FaCoins className='absolute top-0 left-0 w-full h-full p-2 text-accent-gray dark:text-primary-light z-10' />
                        </span>
                        <span className='ml-2 text-primary-light dark:text-accent-gray text-sm'>
                            Total Expenses
                        </span>
                 </span>
                 <span className='mx-6 mt-4'>
                    <span className='text-lg text-accent-darkGray mr-1'>
                        Tshs
                    </span> 
                    <span className='font-bold text-4xl text-primary-light'>
                        20k
                    </span>
                </span>
            </div>
        </div>

        {/* charts */}
        <span className='mt-12 text-primary-dark dark:text-accent-gray font-bold text-lg md:text-xl lg:text-2xl'>Visualization</span>
        <div className=' w-full flex flex-col md:flex-row items-center justify-between'>
            <div className='flex items-center justify-center p-2 mt-2 w-full md:w-[49%] lg:w-[64%] h-[35vh] md:h-[30vh] lg:h-[40vh] bg-primary-dark dark:bg-[#2f2f2f] rounded-lg'>
                <Line data={lineData} options={lineOptions} />
            </div>
            <div className='relative flex items-center justify-center p-2 mt-2 w-full md:w-[49%] lg:w-[34%] h-[35vh] md:h-[30vh] lg:h-[40vh] bg-primary-dark dark:bg-[#2f2f2f] rounded-lg'>
                <Doughnut data={doughnutData} options={doughnutOptions} />
                <span className='absolute flex flex-col items-center justify-center mx-auto mt-16 w-16 h-16'>
                    <span className={`text-sm ${score < 5 ? 'text-red-600' : (score === 5 ? 'text-orange-600' : 'text-green-600')}`}>
                        {score < 5 ? 'Weak' : (score === 5? 'Balanced' : 'Good')}
                    </span>
                    <span className='text-primary-light text-lg font-bold'>
                        6.0
                    </span>
                </span>
            </div>
        </div>
    </div>
  )
}

export default DashboardContent