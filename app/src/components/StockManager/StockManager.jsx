/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaCalendar, FaPlus } from "react-icons/fa";
import StockCard from "./components/StockCard";
import axios from "axios";
import StockModal from "./components/StockModal";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
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
} from "chart.js";

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

function StockManager() {
  const [stock, setStock] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allWeekGroceries, setAllWeekGroceries] = useState([0, 0, 0, 0]);
  const [allMonthsStock, setAllMonthsStock] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [endDate, setEndDate] = useState("");
  const [openStockModal, setOpenStockModal] = useState(false);
  const colors = [
    "#4CAF50", // Green
    "#FF5722", // Deep Orange
    "#2196F3", // Blue
    "#FFC107", // Amber
    "#9C27B0", // Purple
    "#00BCD4", // Cyan
    "#FFEB3B", // Yellow
    "#E91E63", // Pink
    "#795548", // Brown
    "#607D8B", // Blue Grey
    "#673AB7", // Deep Purple
    "#F44336", // Red
    "#3F51B5", // Indigo
    "#8BC34A", // Light Green
    "#FF9800", // Orange
    "#CDDC39", // Lime
    "#009688", // Teal
    "#03A9F4", // Light Blue
    "#FFCDD2", // Light Pink
    "#D32F2F", // Dark Red
  ];

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
      title: {
        display: true,
        text: "Weekly Stock",
        color: "#ffffff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#444444",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#444444",
        },
      },
    },
  };

  // const doughnutData = {
  //   labels: allCategories,
  //   datasets: [
  //     {
  //       label: "Total",
  //       data: allWeekGroceries,
  //       backgroundColor: colors.slice(0, allCategories.length > 0 && allCategories.length) ,
  //       hoverOffset: 4,
  //     },
  //   ],
  // };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
      title: {
        display: true,
        text: "Total per Category",
        color: "#ffffff",
      },
    },
  };
  const fetchStock = async () => {
    try {
      const response = await axios.get("http://localhost:10000/stock");
      const allStock = response.data.data.filter(
        (item) => item.seller._id === localStorage.getItem("smartId")
      );

      setStock(allStock.reverse());

      // Filter stock based on the selected date range
      const filteredStock = allStock.filter((item) => {
        const itemDate = new Date(item.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return (!startDate || itemDate >= start) && (!endDate || itemDate <= end);
      });

      // Calculate weekly stock data based on the filtered stock
      const stockData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      filteredStock.forEach((item) => {
        const fullSaleDate = new Date(item.date);
        const date = new Date(item.date).toISOString().split('T')[0].slice(8,);
        const currentMonth = new Date()
            .toISOString()
            .split("T")[0]
            .slice(-5, -3);
          const currentYear = new Date()
            .toISOString()
            .split("T")[0]
            .slice(0, 4);

          // sale details
          const salesDate = fullSaleDate.toISOString().split("T")[0].slice(-2);
          const salesMonth = fullSaleDate
            .toISOString()
            .split("T")[0]
            .slice(-5, -3);
          const salesYear = fullSaleDate
            .toISOString()
            .split("T")[0]
            .slice(0, 4);

        console.log(date)
        if(parseInt(currentYear) === parseInt(salesYear)){
          if(parseInt(currentMonth) === parseInt(salesMonth)){
          stockData[date-1] += parseInt(item.quantity.split(' ')[0]);
        }
      }
      });

      setAllMonthsStock(stockData);

      // Count the occurrences of each type in the stock
      const typeCountMap = {};
      allStock.forEach((item) => {
        const type = item.type.toLowerCase().trim();
        if (typeCountMap[type]) {
          typeCountMap[type] += 1;
        } else {
          typeCountMap[type] = 1;
        }
      });

      // Set the allWeekGroceries state based on the counts of each category
      const groceriesData = allCategories.map((category) =>
        typeCountMap[category] || 0
      );
      setAllWeekGroceries(groceriesData);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:10000/categories");
      const categories = response.data.data
        .filter((c) => c.seller._id === localStorage.getItem("smartId"))
        .map((category) => category.name.toLowerCase().trim());
      setAllCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchStock();
  }, [allMonthsStock]);

  const doughnutData = {
    labels: allCategories,
    datasets: [
      {
        label: "Total",
        data: allWeekGroceries,
        backgroundColor: colors.slice(0, allCategories.length),
        hoverOffset: 4,
      },
    ],
  };

  const lineData = {
    labels: [
      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
    ],
    datasets: [
      {
        label: "Weekly Stock (Quantity)",
        data: allMonthsStock,
        borderColor: "#fff",
        backgroundColor: "#4b556350",
        fill: true,
        tension: 0.3,
      },
    ],
  };


  const toggleOpenModal = () => setOpenStockModal(!openStockModal);

  useEffect(() => {
    console.log('AllWeekGroceries' ,allWeekGroceries);
    console.log('AllWeekStock' ,allMonthsStock);
  },[allWeekGroceries,allMonthsStock])

  return (
    <div className="w-full h-[100vh]">
      {openStockModal && (
        <StockModal onClose={toggleOpenModal} callback={fetchStock} categories={allCategories} />
      )}
      {/* title */}
      <span className="w-full mt-2 md:mt-0 flex items-center justify-between text-primary-dark dark:text-primary-light font-bold text-lg md:text-xl lg:text-2xl">
        <span className="flex items-center">
          <FaBoxOpen className="mr-2" />
          StockManager (
          <span className="text-primary-dark dark:text-accent-gray">
            {stock.length}
          </span>
          )
        </span>
        <span>
          <button
            onClick={toggleOpenModal}
            className="flex items-center text-sm md:text-md bg-accent-grayShade dark:bg-primary-glass"
          >
            Add Stock
            <FaPlus className="ml-2" />
          </button>
        </span>
      </span>

      <div className="w-full flex overflow-x-auto my-8 py-2">
        {stock.length === 0 ? (
          <span className="w-full text-primary-dark dark:text-accent-darkGray text-center text-sm">
            There are no stock updates currently
          </span>
        ) : (
          stock &&
          stock.map((s) => (
            <StockCard
              id={s._id}
              key={s._id}
              name={s.name}
              type={s.type}
              quantity={s.quantity}
              categories={allCategories}
              date={s.date}
              seller={s.seller}
              created={s.createdAt}
              updated={s.updatedAt}
              callback={fetchStock}
            />
          ))
        )}
      </div>

      <div className="w-full flex flex-col items-center my-8 py-2">
        {/* <span className="self-start mb-4 font-semibold">Generate Summary</span>
        <span className="w-full flex flex-col lg:flex-row  items-start justify-start lg:justify-between mb-2">
          <span className="text-sm lg:text-md flex md:items-center text-primary-dark dark:text-accent-darkGray">
            <span className="mt-1 md:mt-0 mr-2">
              <FaCalendar className="text-accent-darkGray dark:text-accent-gray" />
            </span>
            Select a time frame to generate your own summary
          </span>

          <div className="w-full lg:w-auto flex flex-col md:flex-row md:items-center mt-4 mb-16">
            <label className="mr-2 mb-2 md:mb-0 text-xs md:text-sm">
              From:
            </label>
            <div className="relative w-full md:w-auto md:mr-12">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 pr-3 py-1 ring-1 ring-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none cursor-pointer rounded bg-accent-grayShade text-gray-800 appearance-none shadow-sm"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-accent-grayShade text-white pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm-7-9h5v5h-5z" />
              </svg>
            </div>

            <label className="mr-2 mt-4 mb-2 md:mb-0 md:mt-0 text-xs md:text-sm">
              To:
            </label>
            <div className="relative w-full md:w-auto bg-accent-grayShade">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-10 pr-3 py-1 ring-1 ring-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none cursor-pointer rounded bg-accent-grayShade text-gray-800 appearance-none shadow-sm"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-accent-grayShade text-white pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm-7-9h5v5h-5z" />
              </svg>
            </div>
          </div>
        </span> */}

        <span className="font-semibold">Weekly Summary Results</span>
        <p className="my-6 text-sm">
          Here is this week's summary generated for your stock
          {/* from{" "}
          <span className="p-1 md:p-2 text-xs bg-accent-grayShade dark:bg-primary-glass rounded-md">
            {startDate ? startDate : "the beggining of business"}
          </span>{" "}
          to{" "}
          <span className="p-1 md:p-2 text-xs bg-accent-grayShade dark:bg-primary-glass rounded-md">
            {endDate ? endDate : "today"}
          </span> */}
          . There are a total of{" "}
          <span className="p-1 md:p-2 text-xs bg-accent-grayShade dark:bg-primary-glass rounded-md">
            {stock.length}
          </span>{" "}
          stock in store. Here is the chat analysis for you :
        </p>
        {/* charts */}
        <div className=" w-full flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center justify-center p-2 mt-2 w-full md:w-[49%] lg:w-[64%] h-auto md:h-[23rem] lg:h-[25rem] bg-accent-grayShade dark:bg-primary-glass rounded-lg">
            <Line data={lineData} options={lineOptions} />
          </div>
          <div className="relative flex items-center justify-center p-2 mt-2 w-full md:w-[49%] lg:w-[34%] h-auto md:h-[23rem] lg:h-[25rem] bg-accent-grayShade dark:bg-primary-glass rounded-lg">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockManager;
