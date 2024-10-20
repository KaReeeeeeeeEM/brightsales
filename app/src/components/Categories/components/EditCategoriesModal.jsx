/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useState } from "react";

function EditCategoriesModal({ onClose, callback, id, name }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    name: name,
  });

  const handleChange = (e) => {
    setErrors("");
    setMessage("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name} = formData;
    if (!name) {
      setErrors("Please fill all fields!");
      return;
    }

    const finalData = {
      name: name,
      seller: localStorage.getItem("smartId"),
    };

    await axios
      .put(`https://oyster-app-k8jcp.ondigitalocean.app/categories/${id}`, finalData)
      .then((res) => {
        const { success, message } = res.data;
        if (success && success === true) {
          setMessage(res.data.message);
          setFormData({
            name: "",
          });
          callback()
          onClose();
        } else {
          setErrors(message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message ? err.response.data.message : "Error while updating category", err);
        setErrors(err.response.data.message ? err.response.data.message : "Error while updating category");
      });
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center z-[100]">
      <div className="relative w-full h-full">
        <span
          onClick={() => onClose()}
          className="bg-[#00000090] absolute top-0 right-0 border w-full h-full"
        ></span>
        <div className="py-2 absolute top-1/4 left-5 md:left-[20%] lg:left-1/3 w-[90%] md:w-[60%] lg:w-[35%] bg-accent-darkGray dark:bg-primary-glass rounded-md">
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col items-center justify-center p-4"
          >
            <span className="mb-4 text-xl font-bold text-primary-light dark:text-accent-gray">
              Edit Category
            </span>
            {/* name */}
            <div className="relative w-full mt-2 md:mt-4">
              <label
                className="block text-start text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="name"
              >
                Category
              </label>
              <input
                className="appearance-none bg-accent-grayShade dark:bg-primary-glass border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
                id="name"
                required
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name of category "
              />
            </div>

            {/* submit button */}
            <button
              type="submit"
              className={`w-full mt-6 px-4 py-2 text-accent-darkGray dark:text-accent-gray flex items-center justify-center text-center bg-primary dark:bg-accent-darkGray rounded-lg hover:opacity-85 transition ease-in-out duration-700 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Expense"}
            </button>
          </form>
          {/* errors */}
          <span className="text-red-500 text-sm mb-2">
            {errors ? errors : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export default EditCategoriesModal;
