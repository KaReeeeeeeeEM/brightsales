/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaStackOverflow } from "react-icons/fa";
import EditStockModal from "../../StockManager/components/EditStockModal";
import axios from "axios";
import DeleteStockModal from "./DeleteStockModal";

function StockCard({
  id,
  name,
  type,
  quantity,
  sales,
  unitPrice,
  categories,
  seller,
  date,
  created,
  updated,
  callback,
}) {
  const [openEditStockModal, setOpenEditStockModal] = useState(false);
  const [openDeleteStockModal, setOpenDeleteStockModal] = useState(false);

  const toggleModal = () => setOpenEditStockModal(!openEditStockModal);
  const toggleOpenDeleteModal = () =>
    setOpenDeleteStockModal(!openDeleteStockModal);

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

  const deleteStock = async () => {
    await axios
      .delete(`http://localhost:10000/stock/${id}`)
      .then(async (res) => {
        if (res.data.success === true) {
          const newActivity = {
            name: "Stock Removed",
            seller: localStorage.getItem("smartId"),
            details: `Removed ${quantity} of ${name} from the store`,
          };
          const activityUpdate = await axios.post(
            "http://localhost:10000/activity",
            newActivity
          );
          if (activityUpdate) callback();
        } else {
          console.log("Error deleting stock", res.data.message);
        }
      })
      .catch((err) => {
        console.log("Check your internet connection and try again!");
      });
  };

  return (
    <span className="flex flex-col p-3 mt-2 w-full xl:w-[23.5%] md:w-[47%] h-auto rounded-lg bg-accent-gray dark:bg-primary-glass mr-4 shrink-0">
      {openEditStockModal && (
        <EditStockModal
          id={id}
          name={name}
          type={type}
          categories={categories && categories.map(c => c.name)}
          quantity={quantity}
          unitPrice={unitPrice}
          seller={seller}
          date={date}
          onClose={toggleModal}
          callback={callback}
        />
      )}
      {openDeleteStockModal && (
        <DeleteStockModal
          name={name}
          confirm={deleteStock}
          onClose={toggleOpenDeleteModal}
        />
      )}
      <span className="w-full flex items-center justify-between">
        <span className="flex items-center">
          <FaStackOverflow className="mr-2" />
          <span className="text-gray font-semibold text-sm">{name}</span>
        </span>

        <span className="text-xs text-[#333] dark:text-accent-gray">
          {timeSince(created)}
        </span>
      </span>
      <span className="text-sm flex items-center mt-2">
        <span className="mr-2">Type: </span>
        <span className="text-[#333] dark:text-accent-gray">{type}</span>
      </span>
      <span className="text-sm flex items-center">
        <span className="mr-2">
          {type.toLowerCase().trim() !== "capital"
            ? "Stock remaining"
            : "Amount"}
          :{" "}
        </span>
        <span className="text-[#333] dark:text-accent-gray">
          {type.toLowerCase().trim() !== "capital" ? (
            (type.toLowerCase().trim() !== "capital" ||
              !type.toLowerCase().trim().includes("capital")) &&
            (type.toLowerCase().trim() !== "mtaji" ||
              !type.toLowerCase().trim().includes("mtaji")) &&
            (type.toLowerCase().trim() !== "kianzio" ||
              !type.toLowerCase().trim().includes("kianzio")) &&
            isNaN(quantity) ? (
              parseInt(quantity.split(" ").filter((q) => !isNaN(q))) -
              (sales.filter((s) => s.stock && s.stock._id === id).length > 0 &&
                sales
                  .filter((s) => s.stock && s.stock._id === id)
                  .reduce((a, s) => (a += parseInt(s.quantity)), 0)) +
              " units"
            ) : parseInt(quantity) -
                (sales.filter((s) => s.stock !== null && s.stock._id === id)
                  .length > 0
                  ? sales
                      .filter((s) => s.stock && s.stock._id === id)
                      .reduce((a, s) => (a += s.quantity), 0)
                  : 0) <=
              0 ? (
                <span className="text-red-700 italic text-xs py-[2px] px-2 bg-red-100 rounded font-semibold">Out of stock</span>
            ) : (
              parseInt(quantity) -
              (sales.filter((s) => s.stock !== null && s.stock._id === id)
                .length > 0
                ? sales
                    .filter((s) => s.stock && s.stock._id === id)
                    .reduce((a, s) => (a += s.quantity), 0)
                : 0) +
              " units"
            )
          ) : (
            `Tsh ${quantity}/=`
          )}
        </span>
      </span>
      {type.toLowerCase().trim() !== "capital" && (
        <span className="text-sm flex items-center">
          <span className="mr-2">Unit Price: </span>
          <span
            className={
              unitPrice === 0
                ? "italic text-red-600"
                : "text-[#333] dark:text-accent-gray"
            }
          >
            {unitPrice === 0 ? "Not set" : `Tsh ${unitPrice}/=`}
          </span>
        </span>
      )}
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

        <button
          onClick={toggleOpenDeleteModal}
          className="bg-red-800 text-white"
        >
          Delete
        </button>
      </div>
    </span>
  );
}

export default StockCard;
