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
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState([]);
  const [sales, setSales] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allWeekGroceries, setAllWeekGroceries] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ]);
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
        text: "Monthly Trend",
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

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://oyster-app-k8jcp.ondigitalocean.app/categories");
      const categories = response.data.data
        .filter(
          (c) => c.seller && c.seller._id === localStorage.getItem("smartId")
        )
        .map((category) => category.name.toLowerCase().trim());
      setAllCategories(categories);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStock = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://oyster-app-k8jcp.ondigitalocean.app/stock");
      const allStock = response.data.data.filter(
        (item) =>
          item.seller && item.seller._id === localStorage.getItem("smartId")
      );
      setStock(allStock.reverse());

      // Filter stock based on the selected date range
      const filteredStock = allStock.filter((item) => {
        const itemDate = new Date(item.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return (
          (!startDate || itemDate >= start) && (!endDate || itemDate <= end)
        );
      });

      // Calculate weekly stock data based on the filtered stock
      const stockData = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ];
      filteredStock.forEach((item) => {
        const fullSaleDate = new Date(item.date);
        const date = new Date(item.date).toISOString().split("T")[0].slice(8);
        const currentMonth = new Date()
          .toISOString()
          .split("T")[0]
          .slice(-5, -3);
        const currentYear = new Date().toISOString().split("T")[0].slice(0, 4);

        // sale details
        const salesDate = fullSaleDate.toISOString().split("T")[0].slice(-2);
        const salesMonth = fullSaleDate
          .toISOString()
          .split("T")[0]
          .slice(-5, -3);
        const salesYear = fullSaleDate.toISOString().split("T")[0].slice(0, 4);

        if (parseInt(currentYear) === parseInt(salesYear)) {
          if (parseInt(currentMonth) === parseInt(salesMonth)) {
            stockData[date - 1] +=
              (item.type.toLowerCase().trim() !== "capital" ||
                !item.type.toLowerCase().trim().includes("capital")) &&
              (item.type.toLowerCase().trim() !== "mtaji" ||
                !item.type.toLowerCase().trim().includes("mtaji")) &&
              (item.type.toLowerCase().trim() !== "kianzio" ||
                !item.type.toLowerCase().trim().includes("kianzio")) &&
              parseInt(item.quantity);
          }
        }
      });

      setAllMonthsStock(stockData);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching stock data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://oyster-app-k8jcp.ondigitalocean.app/sales");
      const allSales = response.data.data.filter(
        (s) => s.seller && s.seller._id === localStorage.getItem("smartId")
      );
      setSales(allSales);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchStock();
    fetchSales();
  }, []);

  useEffect(() => {
    // Count the occurrences of each type in the stock
    const typeCountMap = {};
    stock.forEach((item) => {
      const type = item.type.toLowerCase().trim();
      if (typeCountMap[type]) {
        typeCountMap[type] += 1;
      } else {
        typeCountMap[type] = 1;
      }
    });

    // Set the allWeekGroceries state based on the counts of each category
    const groceriesData = allCategories.map(
      (category) => typeCountMap[category] || 0
    );
    setAllWeekGroceries(groceriesData);
  }, [stock]);

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
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    datasets: [
      {
        label: "Monthly Stock (Quantity)",
        data: allMonthsStock,
        borderColor: "#fff",
        backgroundColor: "#4b556350",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const toggleOpenModal = () => setOpenStockModal(!openStockModal);

  return (
    <div className="w-full h-[100vh]">
      {openStockModal && (
        <StockModal
          onClose={toggleOpenModal}
          callback={fetchStock}
          categories={allCategories}
        />
      )}
      {/* title */}
      <span className="w-full mt-2 md:mt-0 flex items-center justify-between text-primary-dark dark:text-primary-light font-bold text-lg md:text-xl lg:text-2xl">
        <span className="hidden md:flex items-center">
          <FaBoxOpen className="mr-2" />
          StockManager
        </span>
        <span className="flex md:hidden items-center">
          <FaBoxOpen className="mr-2" />
          Stock
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
        {loading ? (
          <span className="w-full text-primary-dark dark:text-accent-darkGray text-center text-sm">
            Fetching stock from the store...
          </span>
        ) : stock.length === 0 ? (
          <span className="w-full text-primary-dark dark:text-accent-darkGray text-center text-sm">
            There are no stock updates currently
          </span>
        ) : (
          stock.length > 0 &&
          stock.map((s) => (
            <StockCard
              id={s._id}
              key={s._id}
              name={s.name}
              type={s.type}
              sales={sales}
              quantity={s.quantity}
              unitPrice={s.unitPrice}
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
        <span className="font-semibold">Summary Results</span>
        <p className="my-6 text-sm">
          Here is this month's summary generated for your stock . There are a
          total of{" "}
          <span className="p-1 md:p-2 text-xs bg-accent-grayShade dark:bg-primary-glass rounded-md">
            {allMonthsStock.reduce(
              (a, s) =>
                (a += !isNaN(s.quantity)
                  ? s.quantity.split(" ").filter((q) => !isNaN(q))
                  : s),
              0
            )}
          </span>{" "}
          stock brought in store just this month. Here is the chat analysis for
          you :
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
