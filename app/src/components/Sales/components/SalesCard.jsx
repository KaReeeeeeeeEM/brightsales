/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaChartBar, FaStackOverflow } from "react-icons/fa";
import EditSalesModal from "./EditSalesModal";
import axios from "axios";
import DeleteSalesModal from "./DeleteSalesModal";

function SalesCard({ id, name, sales, type, amount, sellingPrice, quantity, stock, stockSelected, seller, date, created, updated, callback }) {
  const [openEditSalesModal, setOpenEditSalesModal] = useState(false);
  const [openDeleteSalesModal, setOpenDeleteSalesModal] = useState(false);

  const toggleModal = () => setOpenEditSalesModal(!openEditSalesModal);
  const toggleOpenDeleteModal = () => setOpenDeleteSalesModal(!openDeleteSalesModal);

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
    await axios.delete(`http://localhost:10000/sales/${id}`)
    .then(
      async res => {
        if(res.data.success === true){
            const newActivity = {
              name: 'Sales Removed',
              seller: localStorage.getItem('smartId'),
              details: `Removed ${amount} of ${name} from the sales list`
            }
            const activityUpdate = await axios.post('http://localhost:10000/activity', newActivity)
            if(activityUpdate) callback();
        } else {
          console.log('Error deleting sales', res.data.message);
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
    <span className="flex flex-col p-3 mt-2 w-full xl:w-[23.5%] md:w-[47%] h-auto rounded-lg bg-accent-gray dark:bg-primary-glass hover:opacity-[105] mr-4 shrink-0">
      {openEditSalesModal && stock.length > 0 && stockSelected !== 'Stock removed' && (
        <EditSalesModal id={id} name={name} amount={amount} sellingPrice={sellingPrice} quantity={quantity} stockSelected={stockSelected} stock={stock} sales={sales} seller={seller} date={date} onClose={toggleModal} callback={callback} />
      )}
      {openDeleteSalesModal && <DeleteSalesModal name={name} confirm={deleteExpense} onClose={toggleOpenDeleteModal} />}
      <span className="w-full flex items-center justify-between">
        <span className="flex items-center">
          <FaChartBar className="mr-2" />
          <span className={`text-gray font-semibold text-sm ${name === 'Stock name not present' ? 'italic line-through text-accent-darkGray' : ''}`}>{name} {stockSelected && name !== 'Stock name not present' ? " (" + stockSelected.type + ")" : ''}</span>
        </span>

        <span className="text-xs text-[#333] dark:text-accent-gray">
          {timeSince(created)}
        </span>
      </span>
      <span className="text-sm flex items-center">
        <span className="mr-2">Total: </span>
        <span className="text-[#333] dark:text-accent-gray">Tsh {amount}/=</span>
      </span>
      <span className="text-sm flex items-center">
        <span className="mr-2">Selling Price: </span>
        <span className="text-[#333] dark:text-accent-gray">Tsh {sellingPrice}/=</span>
      </span>
      <span className="text-sm flex items-center">
        <span className="mr-2">Units Sold: </span>
        <span className="text-[#333] dark:text-accent-gray">{quantity}</span>
      </span>
      <span className="text-sm flex items-center">
        <span className="mr-2">Made by: </span>
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

export default SalesCard;
