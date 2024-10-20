/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useState } from "react";

function SalesModal({ onClose, callback, stock }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    stock: "",
    amount: "",
    seller: "",
    date: ""
  });
  const allStock = stock;

  const handleChange = (e) => {
    setErrors("");
    setMessage("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { stock, amount, date } = formData;
    if (!stock || !amount || !date) {
      setErrors("Please fill all fields!");
      return;
    }

    const finalData = {
      stock: stock,
      amount: amount,
      seller: localStorage.getItem("smartId"),
      date: date,
    };

    await axios
      .post("https://oyster-app-k8jcp.ondigitalocean.app/sales", finalData)
      .then(async (res) => {
        const { success, message } = res.data;
        const stockName = allStock.length > 0 && allStock.filter(s => s._id === formData.stock)[0].name;
        if (success && success === true) {
          setMessage(res.data.message);
          const newActivity = {
            name: 'Sales added',
            seller: localStorage.getItem('smartId'),
            details: `Sold Tshs ${finalData.amount}/= worth of ${stockName}`
          }
          const activityUpdate = await axios.post('https://oyster-app-k8jcp.ondigitalocean.app/activity', newActivity)
          if(activityUpdate.data.success === true){
                setFormData({
                  name: "",
                  amount: "",
                  date: "",
                });
                callback()
                onClose();
          } else {
            setErrors(activityUpdate.data.message);
          }
        } else {
          setErrors(message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message ? err.response.data.message : "Error while adding sale", err);
        setErrors(err.response.data.message ? err.response.data.message : "Error while adding sale");
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
              Record Sales
            </span>
            {/* name */}
            <div className="relative w-full mt-2 md:mt-4">
              <label
                className="block text-start text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="name"
              >
                Stock Sold
              </label>
              <select
                id="stock"
                name="stock"
                type="select"
                required
                value={formData.stock}
                onChange={handleChange}
                autoFocus={true}
                className="appearance-none bg-accent-grayShade dark:bg-primary-glass border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
              >
                <option value="">What stock did you sell?</option>
                {stock.length > 0 && stock.map(s => <option  key={s._id} value={s._id}>{s.name} ({s.type})</option>)}
              </select>
            </div>

            {/* amount */}
            <div className="relative w-full mt-2 md:mt-4">
              <label
                className="block text-start text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="amount"
              >
                Earnings
              </label>
              <input
                className="appearance-none bg-accent-grayShade dark:bg-primary-glass border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
                id="amount"
                required
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                placeholder="How much did you earn? eg.3000, 300000, etc "
              />
            </div>

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
              {loading ? "Recording sales..." : "Record Sale"}
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

export default SalesModal;
