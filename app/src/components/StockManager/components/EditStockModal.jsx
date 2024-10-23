/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useState } from "react";

function EditStockModal({
  onClose,
  callback,
  id,
  categories,
  name,
  type,
  quantity,
  date,
  unitPrice,
  seller,
}) {
  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [difference, setDifference] = useState(0);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    name: name,
    type: type,
    quantity: quantity,
    unitPrice: unitPrice,
    date: date,
  });

  const handleChange = (e) => {
    setErrors("");
    setMessage("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name.toLowerCase().trim() === "quantity" && value !== 0) {
      setDifference(value - quantity);
      setFormData({ ...formData, quantity: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, type, quantity, unitPrice, date } = formData;
    if (!name || !type || !quantity || !unitPrice || !date) {
      setErrors("Please fill all fields!");
      return;
    }

    const finalData = {
      name: name,
      type: type,
      quantity: quantity,
      unitPrice: unitPrice,
      seller: localStorage.getItem("smartId"),
      date: date,
    };

    await axios
      .put(`http://localhost:10000/stock/${id}`, finalData)
      .then((res) => {
        const { success, message } = res.data;
        if (success && success === true) {
          setMessage(res.data.message);
          setFormData({
            name: "",
            type: "",
            quantity: "",
            unitPrice: 0,
            date: "",
          });
          callback();
          onClose();
        } else {
          setErrors(message);
        }
      })
      .catch((err) => {
        console.log(
          err.response.data.message
            ? err.response.data.message
            : "Error while updating stock",
          err
        );
        setErrors(
          err.response.data.message
            ? err.response.data.message
            : "Error while updating stock"
        );
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
              Edit Stock Details
            </span>
            {/* name */}
            <div className="relative w-full mt-2 md:mt-4">
              <label
                className="block text-start text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none bg-accent-grayShade dark:bg-primary-glass border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name of stock"
                autoFocus={true}
              />
            </div>

            {/* type */}
            <div className="relative w-full mt-2 md:mt-4">
              <label
                className="block text-start text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="type"
              >
                Type of Stock
              </label>
              <select
                name="type"
                id="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="appearance-none bg-accent-grayShade dark:bg-primary-glass border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
              >
                <option value="">Choose category of stock</option>
                <option value="Capital">Capital (mtaji)</option>
                {categories.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* quantity */}
            <div className="relative flex flex-col  w-full mt-2 md:mt-4">
              <label
                className="block text-start text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="quantity"
              >
                {formData.type.toLowerCase().trim() !== 'capital' ? 'Quantity' : 'Amount (in Tshs)'}
              </label>
              <input
                className="appearance-none bg-accent-grayShade dark:bg-primary-glass border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
                id="quantity"
                required
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity eg. 2kg, 1 sack etc"
              />
              <span className="text-xs self-start mt-2">
                {difference !== 0 &&
                  (difference > 0 ? (
                    <span>
                      Adding
                      <span className="text-green-600 font-semibold mx-1">
                        {difference}
                      </span>
                      more units
                    </span>
                  ) : (
                    <span>
                      Decreasing
                      <span className="text-red-600 font-semibold mx-1">
                        {-difference}
                      </span>
                      less units
                    </span>
                  ))}
              </span>
            </div>

            {/* unit price */}
            {formData.type.toLowerCase().trim() !== 'capital' && <div className="relative w-full mt-2 md:mt-4">
              <label
                className="block text-start text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="unitPrice"
              >
                Unit Price
              </label>
              <input
                className="appearance-none bg-accent-grayShade dark:bg-primary-glass border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
                id="unitPrice"
                required
                name="unitPrice"
                type="number"
                value={formData.unitPrice}
                onChange={handleChange}
                placeholder="How much do you sell per unit? (in Tshs)"
              />
            </div>}

            {/* Date */}
            <div className="relative w-full mt-2 md:mt-4">
              <label
                className="block text-start text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="date"
              >
                Select Date
              </label>
              <input
                className="appearance-none bg-accent-grayShade dark:bg-primary-glass border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
                id="date"
                required
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Set date "
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
              {loading ? "Updating Stock..." : "Update Stock"}
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

export default EditStockModal;
