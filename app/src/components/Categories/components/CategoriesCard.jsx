/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaChartBar, FaChartPie, FaStackOverflow } from "react-icons/fa";
import EditCategoriesModal from "./EditCategoriesModal";
import axios from "axios";
import DeleteCategoriesModal from "./DeleteCategoriesModal";

function CategoriesCard({ id, name, seller, date, created, updated, callback }) {
  const [openEditCategoriesModal, setOpenEditCategoriesModal] = useState(false);
  const [openDeleteCategoriesModal, setOpenDeleteCategoriesModal] = useState(false);

  const toggleModal = () => setOpenEditCategoriesModal(!openEditCategoriesModal);
  const toggleOpenDeleteModal = () => setOpenDeleteCategoriesModal(!openDeleteCategoriesModal);

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

  const deleteCategory = async () => {
    await axios.delete(`https://oyster-app-k8jcp.ondigitalocean.app/categories/${id}`)
    .then(
      async res => {
        if(res.data.success === true){
            const newActivity = {
              name: 'Category Removed',
              seller: localStorage.getItem('smartId'),
              details: `Removed ${name} category from the categories list`
            }
            const activityUpdate = await axios.post('https://oyster-app-k8jcp.ondigitalocean.app/activity', newActivity)
            if(activityUpdate) callback();
        } else {
          console.log('Error deleting Categories', res.data.message);
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
      {openEditCategoriesModal && (
        <EditCategoriesModal id={id} name={name} date={date} onClose={toggleModal} callback={callback} />
      )}
      {openDeleteCategoriesModal && <DeleteCategoriesModal name={name} confirm={deleteCategory} onClose={toggleOpenDeleteModal} />}
      <span className="w-full flex items-center justify-between">
        <span className="flex items-center">
          <FaChartPie className="mr-2" />
          <span className="text-gray font-semibold text-sm">{name}</span>
        </span>

        <span className="text-xs text-[#333] dark:text-accent-gray">
          {timeSince(created)}
        </span>
      </span>
      <span className="text-sm flex items-center">
        <span className="mr-2">Added by: </span>
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

export default CategoriesCard;
