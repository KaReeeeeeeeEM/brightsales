/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaChartBar,
  FaChartLine,
  FaCoins,
  FaTachometerAlt,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import ActivityCard from "./ActivityCard";
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
import axios from "axios";

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
  const [allStock, setAllStock] = useState([]);
  const [stockCount, setStockCount] = useState(0);
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [allWeeksSales, setAllWeeksSales] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [activities, setActivities] = useState([]);

  const lineData = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Weekly Sales (in Tsh)",
        data: allWeeksSales,
        borderColor: "#fff",
        backgroundColor: "#4b556350",
        fill: true,
        tension: 0.3,
      },
    ],
  };

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
        text: "Weekly Sales",
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

  const doughnutData = {
    labels: ["Sales", "Expenses"],
    datasets: [
      {
        label: "Sales vs Expenses (in Tsh)",
        data: [totalSales, totalExpenses],
        backgroundColor: ["#fff", "#4b5563"],
        hoverOffset: 4,
      },
    ],
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
        text: "Sales vs Expenses",
        color: "#ffffff",
      },
    },
  };

  const fetchActivities = async () => {
    await axios
      .get("http://localhost:10000/activity")
      .then((res) => {
        setActivities(
          res.data.data
            .filter(
              (f) =>
                f.seller && f.seller._id === localStorage.getItem("smartId")
            )
            .reverse()
        );
      })
      .catch((err) => {
        console.log({
          success: false,
          message: `Error fetching activities ${err}`,
        });
      });
  };

  const fetchStock = async () => {
    await axios
      .get("http://localhost:10000/stock")
      .then((res) => {
        setAllStock(
          res.data.data.filter(
            (f) => f.seller && f.seller._id === localStorage.getItem("smartId")
          )
        );
        setStockCount(
          res.data.data.filter(
            (f) => f.seller && f.seller._id === localStorage.getItem("smartId")
          ).length
        );
      })
      .catch((err) => console.log(err));
  };

  const fetchExpenses = async () => {
    await axios
      .get("http://localhost:10000/expenses")
      .then((res) => {
        setTotalExpenses(
          res.data.data
            .filter(
              (f) =>
                f.seller && f.seller._id === localStorage.getItem("smartId")
            )
            .reduce((a, e) => (a += e.cost), 0)
        );
      })
      .catch((err) => console.log(err));
  };

  const fetchSales = async () => {
    await axios
      .get("http://localhost:10000/sales")
      .then((res) => {
        setSales(
          res.data.data.filter(
            (f) => f.seller && f.seller._id === localStorage.getItem("smartId")
          )
        );
        setTotalSales(
          res.data.data
            .filter(
              (f) =>
                f.seller && f.seller._id === localStorage.getItem("smartId")
            )
            .reduce((a, s) => (a += s.amount), 0)
        );

        // filter weekly sales from all sales
        const allSales = res.data.data.filter(
          (f) => f.seller && f.seller._id === localStorage.getItem("smartId")
        );
        allSales.filter((s) => {
          const fullSaleDate = new Date(s.date);

          const saleDay = fullSaleDate.getDay();
          const today = new Date().getDay();

          // current details
          const currentDate = new Date().toISOString().split("T")[0].slice(-2);
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

          const difference = parseInt(currentDate) - parseInt(salesDate);

          if (parseInt(salesYear) === parseInt(currentYear))
            parseInt(salesMonth) === parseInt(currentMonth)
              ? difference === -1
                ? (allWeeksSales[saleDay] += s.amount * 0.5)
                : difference === 0
                ? (allWeeksSales[saleDay] += s.amount * 0.5)
                : difference === 1
                ? (allWeeksSales[saleDay] += s.amount * 0.5)
                : difference === 2
                ? (allWeeksSales[saleDay] += s.amount * 0.5)
                : difference === 3
                ? (allWeeksSales[saleDay] += s.amount * 0.5)
                : difference === 4
                ? (allWeeksSales[saleDay] += s.amount * 0.5)
                : difference === 5
                ? (allWeeksSales[saleDay] += s.amount * 0.5)
                : difference === 6
                ? (allWeeksSales[saleDay] += s.amount * 0.5)
                : ""
              : "";
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchStock();
    fetchSales();
    fetchExpenses();
    fetchActivities();
  }, []);

  return (
    <div className="w-full flex flex-col items-start justify-start h-auto">
      <span className="mt-2 md:mt-0 flex items-center text-primary-dark dark:text-primary-light font-bold text-lg md:text-xl lg:text-2xl">
        <FaTachometerAlt className="mr-2" />
        Dashboard
      </span>

      {/* cards */}
      <div className="mt-2 md:mt-8 w-full flex flex-col md:flex-row md:flex-wrap items-center justify-between">
        {/* stock card */}
        <div className="flex flex-col w-full md:w-[49%] lg:w-[24%] h-[8rem] md:h-[8rem] mt-2 md:mt-4 lg:mt-0 bg-primary-light dark:bg-primary-glass p-2 rounded-lg group">
          <span className="flex items-center">
            <span className="relative w-8 h-8 group">
              <span className="absolute top-0 left-0 w-full h-full bg-primary-glass dark:bg-accent-darkGray rounded-full group-hover:bg-[#3f3f3f] transition ease-in-out duration-700"></span>
              <FaBoxOpen className="absolute top-0 left-0 w-full h-full p-2 text-accent-gray dark:text-primary-light group-hover:text-[#ccc] z-10" />
            </span>
            <span className="ml-2 text-primary-dark font-bold dark:text-accent-gray text-sm">
              Current Stock In Store
            </span>
          </span>
          <span className="mx-6 mt-4">
            <span className="font-bold text-4xl text-primary-dark dark:text-primary-light">
              {allStock.reduce(
                (a, s) =>
                  (a +=
                    (s.type.toLowerCase().trim() !== "capital" ||
                      !s.type.toLowerCase().trim().includes("capital")) &&
                    (s.type.toLowerCase().trim() !== "mtaji" ||
                      !s.type.toLowerCase().trim().includes("mtaji")) &&
                    (s.type.toLowerCase().trim() !== "kianzio" ||
                      !s.type.toLowerCase().trim().includes("kianzio")) &&
                    (isNaN(s.quantity)
                      ? parseInt(s.quantity.split(" ").filter((q) => !isNaN(q)))
                      : parseInt(s.quantity))),
                0
              ) -
                (sales.length > 0 &&
                  sales
                    .filter((sa) => sa.stock !== null)
                    .reduce((a, ts) => (a += ts.quantity), 0))}
            </span>
            <span className="text-md text-accent-darkGray ml-1">
              {stockCount === 1 ? "item" : "items"}
            </span>
          </span>
        </div>

        {/* total sales card */}
        <div className="flex flex-col w-full md:w-[49%] lg:w-[24%] h-[8rem] md:h-[8rem] mt-2 md:mt-4 lg:mt-0 bg-primary-light dark:bg-primary-glass p-2 rounded-lg group">
          <span className="flex items-center">
            <span className="relative w-8 h-8 group">
              <span className="absolute top-0 left-0 w-full h-full bg-primary-glass dark:bg-accent-darkGray rounded-full group-hover:bg-[#3f3f3f] transition ease-in-out duration-700"></span>
              <FaChartLine className="absolute top-0 left-0 w-full h-full p-2 text-accent-gray dark:text-primary-light group-hover:text-[#ccc] z-10" />
            </span>
            <span className="ml-2 text-primary-dark font-bold dark:text-accent-gray text-sm">
              Total Sales Over Time
            </span>
          </span>
          <span className="mx-6 mt-4">
            <span className="text-lg text-accent-darkGray mr-1">Tshs</span>
            <span className="font-bold text-4xl text-primary-dark dark:text-primary-light">
              {totalSales > 1000000
                ? totalSales / 1000000 + "M"
                : totalSales > 1000
                ? totalSales / 1000 + "k"
                : totalSales}
            </span>
          </span>
        </div>

        {/* weekly sales card */}
        <div className="flex flex-col w-full md:w-[49%] lg:w-[24%] h-[8rem] md:h-[8rem] mt-2 md:mt-4 lg:mt-0 bg-primary-light dark:bg-primary-glass p-2 rounded-lg group">
          <span className="flex items-center">
            <span className="relative w-8 h-8 group">
              <span className="absolute top-0 left-0 w-full h-full bg-primary-glass dark:bg-accent-darkGray rounded-full group-hover:bg-[#3f3f3f] transition ease-in-out duration-700"></span>
              <FaChartBar className="absolute top-0 left-0 w-full h-full p-2 text-accent-gray dark:text-primary-light group-hover:text-[#ccc] z-10" />
            </span>
            <span className="ml-2 text-primary-dark font-bold dark:text-accent-gray text-sm">
              Today's Sales
            </span>
          </span>
          <span className="mx-6 mt-4">
            <span className="text-lg text-accent-darkGray mr-1">Tshs</span>
            <span className="font-bold text-4xl text-primary-dark dark:text-primary-light">
              {allWeeksSales[new Date().getDay()] > 1000000
                ? allWeeksSales[new Date().getDay()] / 1000000 + "M"
                : allWeeksSales[new Date().getDay()] > 1000
                ? allWeeksSales[new Date().getDay()] / 1000 + "k"
                : allWeeksSales[new Date().getDay()]}
            </span>
          </span>
        </div>

        {/* total expenses */}
        <div className="flex flex-col w-full md:w-[49%] lg:w-[24%] h-[8rem] md:h-[8rem] mt-2 md:mt-4 lg:mt-0 bg-primary-light dark:bg-primary-glass p-2 rounded-lg group">
          <span className="flex items-center">
            <span className="relative w-8 h-8 group">
              <span className="absolute top-0 left-0 w-full h-full bg-primary-glass dark:bg-accent-darkGray rounded-full group-hover:bg-[#3f3f3f] transition ease-in-out duration-700"></span>
              <FaCoins className="absolute top-0 left-0 w-full h-full p-2 text-accent-gray dark:text-primary-light group-hover:text-[#ccc] z-10" />
            </span>
            <span className="ml-2 text-primary-dark font-bold dark:text-accent-gray text-sm">
              Net Profit
            </span>
          </span>
          <span className="mx-6 mt-4">
            <span className="text-lg text-accent-darkGray mr-1">Tshs</span>
            <span className="font-bold text-4xl text-primary-dark dark:text-primary-light">
              {totalSales - totalExpenses > 1000000
                ? (totalSales - totalExpenses) / 1000000 + "M"
                : totalSales - totalExpenses > 1000
                ? (totalSales - totalExpenses) / 1000 + "k"
                : totalSales - totalExpenses}
            </span>
          </span>
        </div>
      </div>

      {/* charts */}
      <span className="mt-12 text-primary-dark dark:text-accent-gray font-bold text-lg md:text-xl lg:text-2xl">
        Visualization
      </span>
      <div className=" w-full flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center justify-center p-2 mt-2 w-full md:w-[49%] lg:w-[64%] h-[35vh] md:h-[23rem] lg:h-[25rem] bg-accent-grayShade dark:bg-primary-glass rounded-lg">
          <Line data={lineData} options={lineOptions} />
        </div>
        <div className="relative flex items-center justify-center p-2 mt-2 w-full md:w-[49%] lg:w-[34%] h-[35vh] md:h-[23rem] lg:h-[25rem] bg-accent-grayShade dark:bg-primary-glass rounded-lg">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <span className="absolute flex flex-col items-center justify-center mx-auto mt-16 w-16 h-16">
            <span
              className={`text-xs md:text-sm font-bold ${
                totalSales / totalExpenses < 1
                  ? "text-red-600"
                  : totalSales / totalExpenses === 1
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              {totalSales !== 0 &&
                totalExpenses !== 0 &&
                (totalSales / totalExpenses < 1
                  ? "Weak"
                  : totalSales / totalExpenses === 1
                  ? "Balanced"
                  : totalSales / totalExpenses > 1 &&
                    totalSales / totalExpenses < 3
                  ? "Good"
                  : "Excellent")}
            </span>
            <span className="text-primary-light text-sm md:text-lg font-bold">
              {totalSales !== 0 &&
                totalExpenses !== 0 &&
                Math.round((totalSales * 100) / totalExpenses) / 100}
            </span>
          </span>
        </div>
      </div>

      {/* Recent activities */}
      <span className="mt-12 text-primary-dark dark:text-accent-gray font-bold text-lg md:text-xl lg:text-2xl">
        Recent Activities
      </span>

      {/* table */}
      <div className="w-full flex overflow-x-auto my-8 py-2">
        {activities.length === 0 ? (
          <span className="w-full text-primary-dark dark:text-accent-darkGray text-center text-sm">
            There are no activity updates currently
          </span>
        ) : (
          activities
            .slice(0, 20)
            .map((a, c) => (
              <ActivityCard
                key={c}
                title={a.name}
                activity={a.details}
                date={a.createdAt}
              />
            ))
        )}
      </div>
    </div>
  );
}

export default DashboardContent;
