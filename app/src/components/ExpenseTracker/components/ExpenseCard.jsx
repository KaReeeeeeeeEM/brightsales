/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaStackOverflow } from "react-icons/fa";
import EditExpensesModal from "./EditExpensesModal";
import axios from "axios";
import DeleteExpensesModal from "./DeleteExpensesModal";

function ExpenseCard({ id, name, cost, seller, date, created, updated, callback }) {
  const [openEditExpensesModal, setOpenEditExpensesModal] = useState(false);
  const [openDeleteExpensesModal, setOpenDeleteExpensesModal] = useState(false);

  const toggleModal = () => setOpenEditExpensesModal(!openEditExpensesModal);
  const toggleOpenDeleteModal = () => setOpenDeleteExpensesModal(!openDeleteExpensesModal);

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

  const deleteExpense = async () => {
    await axios.delete(`http://localhost:10000/expenses/${id}`)
    .then(
      async res => {
        if(res.data.success === true){
            const newActivity = {
              name: 'Expense Removed',
              seller: localStorage.getItem('smartId'),
              details: `Removed ${cost} of ${name} from the expense list`
            }
            const activityUpdate = await axios.post('http://localhost:10000/activity', newActivity)
            if(activityUpdate) callback();
        } else {
          console.log('Error deleting expense', res.data.message);
        }
      }
    )
    .catch(
      err => {
        console.log('Check your internet connection and try again!', err);
      }
    )
  } 

  return (
    <span className="flex flex-col p-3 mt-2 w-full xl:w-[23.5%] md:w-[47.5%] h-auto rounded-lg bg-accent-gray dark:bg-primary-glass mr-4 shrink-0">
      {openEditExpensesModal && (
        <EditExpensesModal id={id} name={name} cost={cost} seller={seller} date={date} onClose={toggleModal} callback={callback} />
      )}
      {openDeleteExpensesModal && <DeleteExpensesModal name={name} confirm={deleteExpense} onClose={toggleOpenDeleteModal} />}
      <span className="w-full flex items-center justify-between">
        <span className="flex items-center">
          <FaStackOverflow className="mr-2" />
          <span className="text-gray font-semibold text-sm">{name}</span>
        </span>

        <span className="text-xs text-[#333] dark:text-accent-gray">
          {timeSince(created)}
        </span>
      </span>
      <span className="text-sm flex items-center">
        <span className="mr-2">Total: </span>
        <span className="text-[#333] dark:text-accent-gray">Tsh {cost}/=</span>
      </span>
      <span className="text-sm flex items-center">
        <span className="mr-2">Incurred by: </span>
        <span className="text-[#333] dark:text-accent-gray">
          {seller.username}
        </span>
      </span>
      <span className="text-sm flex items-center">
        <span className="mr-2">Date: </span>
        <span className="text-[#333] dark:text-accent-gray">
          {date.split("T")[0]}
        </span>
      </span>

      {/* action buttons  */}
      <div className="w-full flex items-center justify-between mt-2">
        <button onClick={toggleModal} className="bg-white text-accent-darkGray">
          Edit
        </button>

        <button onClick={toggleOpenDeleteModal} className="bg-red-800 text-white">Delete</button>
      </div>
    </span>
  );
}

export default ExpenseCard;
