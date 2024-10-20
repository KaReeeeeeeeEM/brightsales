/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaCalendar, FaCoins, FaPlus } from "react-icons/fa";
import ExpenseCard from "./components/ExpenseCard";
import axios from "axios";
import ExpenseModal from "./components/ExpenseModal";

function ExpenseTracker() {
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openStockModal, setOpenStockModal] = useState(false);

  const fetchExpenses = async () => {
    setLoading(true)
    await axios
      .get("https://oyster-app-k8jcp.ondigitalocean.app/expenses")
      .then((res) => {
        setLoading(false)
        setExpenses(
          res.data.data
            .filter((f) => f.seller && f.seller._id === localStorage.getItem("smartId"))
            .reverse()
        );
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
      .finally(
        () => setLoading(false)
      )
  };

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
        <span className="hidden md:flex items-center">
          <FaCoins className="mr-2" />
          Expense Tracker (
          <span className="hidden md:block text-primary-dark dark:text-accent-gray">
            {expenses && expenses.reduce((a, e) => (a += e.cost), 0) > 1000000
              ? expenses.reduce((a, e) => (a += e.cost), 0) / 1000000 + "M"
              : expenses.reduce((a, e) => (a += e.cost), 0) > 1000
              ? expenses.reduce((a, e) => (a += e.cost), 0) / 1000 + "k"
              : expenses.reduce((a, e) => (a += e.cost), 0)}
          </span>
          )
        </span>
        <span className="flex md:hidden items-center">
          <FaCoins className="mr-2" />
          Expenses (
          <span className="block md:hidden text-primary-dark dark:text-accent-gray">
            {!loading && expenses && expenses.reduce((a, e) => (a += e.cost), 0) > 1000000
              ? expenses.reduce((a, e) => (a += e.cost), 0) / 1000000 + "M"
              : expenses.reduce((a, e) => (a += e.cost), 0) > 1000
              ? expenses.reduce((a, e) => (a += e.cost), 0) / 1000 + "k"
              : expenses.reduce((a, e) => (a += e.cost), 0)}
          </span>
          )
        </span>
        <span>
          <button
            onClick={toggleOpenModal}
            className="hidden md:flex items-center text-sm md:text-md bg-accent-grayShade dark:bg-primary-glass"
          >
            Record Expenses
            <FaPlus className="ml-2" />
          </button>
          <button
            onClick={toggleOpenModal}
            className="flex md:hidden items-center text-sm md:text-md bg-accent-grayShade dark:bg-primary-glass"
          >
            Add
            <FaPlus className="ml-2" />
          </button>
        </span>
      </span>

      <div className="w-full flex flex-col md:flex-row flex-wrap my-8 py-2">
        {
          loading ?
          <span className="w-full text-primary-dark dark:text-accent-darkGray text-center text-sm">Fetching expenses...</span>
          :
        expenses && expenses.length === 0 ? (
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
