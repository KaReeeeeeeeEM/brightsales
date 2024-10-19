/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

function DeleteExpensesModal({ onClose, name, confirm }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center z-[100]">
      <div className="relative w-full h-full">
        <span
          onClick={() => onClose()}
          className="bg-[#00000095] absolute top-0 right-0 border w-full h-full"
        ></span>
        <div className="flex flex-col p-6 absolute top-1/3 left-5 md:left-[20%] lg:left-1/3 w-[90%] md:w-[60%] lg:w-[35%] bg-accent-darkGray dark:bg-primary-glass rounded-md">
          <span className="w-full flex items-start font-semibold text-accent-gray dark:text-accent-darkGray">
            <FaInfoCircle className="mr-2 mt-1 text-accent-gray w-6 h-6" />
            <span className="text-justify">Are you sure you want to delete this expense "<span className="text-primary dark:text-accent-gray">{name}</span>"?</span>
          </span>

          <span className="w-full flex items-center justify-between mt-6">
            <button onClick={() => onClose()} className="bg-accent-grayShade">
              No
            </button>
            <button
              onClick={() => {
                confirm();
                onClose();
              }}
              className="bg-accent-gray dark:text-accent-darkGray"
            >
              Yes
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DeleteExpensesModal;
