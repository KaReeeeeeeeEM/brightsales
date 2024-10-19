/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaCalendar, FaCoins, FaPlus } from "react-icons/fa";
import ExpenseCard from "./components/ExpenseCard";
import axios from "axios";
import ExpenseModal from "./components/ExpenseModal";

function ExpenseTracker() {
  const [score, setScore] = useState(6.0);
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openStockModal, setOpenStockModal] = useState(false);

  const fetchExpenses = async () => {
    await axios
      .get("http://localhost:10000/expenses")
      .then(res => {
        console.log(res.data.data)
        setExpenses(res.data.data.filter(f => f.seller._id === localStorage.getItem('smartId')).reverse());
      })
      .catch((err) => console.log(err));
  };

  // Function to filter stock based on the date range
  const filteredExpenses = expenses.filter((stock) => {
    const stockCreatedAt = new Date(stock.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return stockCreatedAt >= start && stockCreatedAt <= end;
    } else if (start) {
      return stockCreatedAt >= start;
    } else if (end) {
      return stockCreatedAt <= end;
    }
    return true;
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const toggleOpenModal = () => setOpenStockModal(!openStockModal);

  return (
    <div className="w-full h-[100vh]">
      {openStockModal && (
        <ExpenseModal onClose={toggleOpenModal} callback={fetchExpenses} />
      )}
      {/* title */}
      <span className="w-full mt-2 md:mt-0 flex items-center justify-between text-primary-dark dark:text-primary-light font-bold text-lg md:text-xl lg:text-2xl">
        <span className="flex items-center">
          <FaCoins className="mr-2" />
          Expense Tracker (<span className="text-primary-dark dark:text-accent-gray">{expenses.length}</span>)
        </span>
        <span>
          <button
            onClick={toggleOpenModal}
            className="flex items-center text-sm md:text-md bg-accent-grayShade dark:bg-primary-glass"
          >
            Record Expenses
            <FaPlus className="ml-2" />
          </button>
        </span>
      </span>

      <div className="w-full flex flex-col md:flex-row flex-wrap my-8 py-2">
        {expenses && expenses.length === 0 ? (
          <span className="w-full text-primary-dark dark:text-accent-darkGray text-center text-sm">
            There are no expenses recorded
          </span>
        ) : (
          expenses &&
          expenses.map((e) => (
            <ExpenseCard
              id={e._id}
              key={e._id}
              name={e.name}
              cost={e.cost}
              date={e.date}
              seller={e.seller}
              created={e.createdAt}
              updated={e.updatedAt}
              callback={fetchExpenses}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseTracker;
