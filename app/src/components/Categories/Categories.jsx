/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaCalendar, FaChartBar, FaChartPie, FaCoins, FaPlus } from "react-icons/fa";
import CategoriesCard from "./components/CategoriesCard";
import axios from "axios";
import CategoriesModal from "./components/CategoriesModal";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openCategoriesModal, setOpenCategoriesModal] = useState(false);

  const fetchCategories = async () => {
    await axios
      .get("https://oyster-app-k8jcp.ondigitalocean.app/categories")
      .then(res => {
        setCategories(res.data.data.filter(f => f.seller && f.seller._id === localStorage.getItem('smartId')).reverse());
      })
      .catch((err) => console.log(err));
  };

  // Function to filter stock based on the date range
  const filteredCategories = categories.filter((category) => {
    const categoryCreatedAt = new Date(category.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return categoryCreatedAt >= start && categoryCreatedAt <= end;
    } else if (start) {
      return categoryCreatedAt >= start;
    } else if (end) {
      return categoryCreatedAt <= end;
    }
    return true;
  });

  useEffect(() => {
    fetchCategories()
  }, []);

  const toggleOpenModal = () => setOpenCategoriesModal(!openCategoriesModal);

  return (
    <div className="w-full h-[100vh]">
      {openCategoriesModal && (
        <CategoriesModal onClose={toggleOpenModal} callback={fetchCategories} />
      )}
      {/* title */}
      <span className="w-full mt-2 md:mt-0 flex items-center justify-between text-primary-dark dark:text-primary-light font-bold text-lg md:text-xl lg:text-2xl">
        <span className="flex items-center">
          <FaChartPie className="mr-2" />
          Categories (<span className="text-primary-dark dark:text-accent-gray">{categories.length}</span>)
        </span>
        <span>
          <button
            onClick={toggleOpenModal}
            className="hidden md:flex items-center text-sm md:text-md bg-accent-grayShade dark:bg-primary-glass"
          >
            New Category
            <FaPlus className="ml-2" />
          </button>
          <button
            onClick={toggleOpenModal}
            className="flex md:hidden items-center text-sm md:text-md bg-accent-grayShade dark:bg-primary-glass"
          >
            New
            <FaPlus className="ml-2" />
          </button>
        </span>
      </span>

      <div className="w-full flex flex-col md:flex-row flex-wrap my-8 py-2">
        {categories && categories.length === 0 ? (
          <span className="w-full text-primary-dark dark:text-accent-darkGray text-center text-sm">
            There are no categories recorded
          </span>
        ) : (
          categories &&
          categories.map((c) => (
            <CategoriesCard
              id={c._id}
              key={c._id}
              name={c.name}
              date={c.createdAt}
              seller={c.seller}
              created={c.createdAt}
              updated={c.updatedAt}
              callback={fetchCategories}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Categories;
