/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";

function EditSalesModal({
  onClose,
  callback,
  id,
  stock,
  sales,
  sellingPrice,
  stockSelected,
  amount,
  quantity,
  date,
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [error, setError] = useState("");
  const [profitPerUnit, setProfitPerUnit ] = useState(0);
  const [unitsLeft, setUnitsLeft] = useState(0);
  const [maxUnits, setMaxUnits] = useState(0);
  const [formData, setFormData] = useState({
    stock: stockSelected._id,
    amount: amount,
    sellingPrice: sellingPrice,
    quantity: quantity,
    date: date,
  });

  const handleChange = (e) => {
    setErrors("");
    setMessage("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "stock" && value !== "") {
      const stockAvailable =
        stock
          .filter((s) => s._id === value)
          .reduce(
            (a, s) =>
              (a +=
                (s.type.toLowerCase().trim() !== "capital" ||
                  !s.type.toLowerCase().trim().includes("capital")) &&
                (s.type.toLowerCase().trim() !== "mtaji" ||
                  !s.type.toLowerCase().trim().includes("mtaji")) &&
                (s.type.toLowerCase().trim() !== "kianzio" ||
                  !s.type.toLowerCase().trim().includes("kianzio")) &&
                (isNaN(s.quantity)
                  ? parseInt(s.quantity.split(" ").filter((q) => !isNaN(q)))
                  : parseInt(s.quantity))),
            0
          ) -
        (sales.filter((s) => s.stock._id === value).length > 0
          ? sales
              .filter((s) => s.stock._id === value)
              .reduce((a, s) => (a += s.quantity), 0)
          : 0);
      setError("");
      setUnitsLeft(stockAvailable);
      setFormData({ ...formData, quantity: 0 });

      setMaxUnits(stockAvailable);
      setFormData({ ...formData, stock: value });
    }

    if (name === "quantity" && value !== 0) {
      const units = stock
        .filter((s) => s._id === formData.stock)
        .reduce(
          (a, s) =>
            (a +=
              (s.type.toLowerCase().trim() !== "capital" ||
                !s.type.toLowerCase().trim().includes("capital")) &&
              (s.type.toLowerCase().trim() !== "mtaji" ||
                !s.type.toLowerCase().trim().includes("mtaji")) &&
              (s.type.toLowerCase().trim() !== "kianzio" ||
                !s.type.toLowerCase().trim().includes("kianzio")) &&
              (isNaN(s.quantity)
                ? parseInt(s.quantity.split(" ").filter((q) => !isNaN(q)))
                : parseInt(s.quantity))),
          0
        ) -
        (sales.filter((s) => s.stock._id === formData.stock).length > 0
          ? sales
              .filter((s) => s.stock._id === formData.stock)
              .reduce((a, s) => (a += s.quantity), 0)
          : 0);

      setUnitsLeft(units)
      setMaxUnits(units)

      if (stockSelected._id !== formData.stock && (units - value) < 0) {
        setUnitsLeft("");
        setError("You have exceeded units available!");
      }

      if (
        stockSelected._id === formData.stock &&
        (units + quantity - value) < 0
      ) {
        setUnitsLeft("");
        setError("You have exceeded units available!");
      } else {
        setError("");
        setUnitsLeft(units - value);
      }

      setFormData({...formData, quantity: value, amount: value * formData.sellingPrice})
    }

    if(name === 'sellingPrice' && value !== 0){
      setFormData({...formData, sellingPrice: value, amount: formData.quantity * value});
      setProfitPerUnit(value - stock.filter(s => s._id === formData.stock)[0].unitPrice);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { stock, amount, sellingPrice, quantity, date } = formData;
    if (!stock || !amount || !sellingPrice || !quantity || !date) {
      setErrors("Please fill all fields!");
      return;
    }

    const finalData = {
      stock: stock,
      amount: amount,
      quantity: quantity,
      sellingPrice: sellingPrice,
      seller: localStorage.getItem("smartId"),
      date: date,
    };

    await axios
      .put(`https://oyster-app-k8jcp.ondigitalocean.app/sales/${id}`, finalData)
      .then((res) => {
        const { success, message } = res.data;
        if (success && success === true) {
          setMessage(res.data.message);
          setFormData({
            stock: "",
            amount: "",
            sellingPrice: 0,
            quantity: 0,
            date: "",
          });
          callback();
          onClose();
        } else {
          setErrors(message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(
          err.response.data.message
            ? err.response.data.message
            : "Error while updating expense",
          err
        );
        setErrors(
          err.response.data.message
            ? err.response.data.message
            : "Error while updating expense"
        );
      })
      .finally(() => setLoading(false));
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
              Edit Sales Details
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
                <option value="">Choose stock sold</option>
                {stock.length > 0 &&
                  stock.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name} ({s.type})
                    </option>
                  ))}
              </select>
            </div>

             {/* selling price */}
             <div className="relative flex flex-col w-full mt-2 md:mt-4">
              <label
                className="block text-start text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="sellingPrice"
              >
                Selling Price
              </label>
              <input
                className="appearance-none bg-accent-grayShade dark:bg-primary-glass border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
                id="sellingPrice"
                required
                name="sellingPrice"
                type="number"
                value={formData.sellingPrice}
                onChange={handleChange}
                placeholder="How much did you sell this stock? eg.3000, 300000, etc "
              />
             {profitPerUnit !== 0 && (profitPerUnit > 0 ? <span className="text-xs self-start mt-1">Profit Per Unit : Tshs <span className="text-green-600 italic">{profitPerUnit}</span>/= </span> : <span className="text-xs self-start mt-1">Loss Per Unit : Tshs <span className="text-red-600 italic">{profitPerUnit}</span>/=</span>)}
            </div>


            {/* quantity */}
            <div className="relative w-full mt-2 md:mt-4 flex flex-col">
              <label
                className="block text-start text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="quantity"
              >
                Units sold
              </label>
              <input
                className="appearance-none bg-accent-grayShade dark:bg-primary-glass border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
                id="quantity"
                required
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="How many units did you sell?"
              />
              {(error || (stockSelected._id !== formData.stock && unitsLeft < 0))  && (
                <span className="text-red-500 text-xs text-start mt-1">
                  {error && error}
                  {unitsLeft < 0 && 'You have exceeded the available units!'}
                </span>
              )}
              {maxUnits > 0 && maxUnits > formData.quantity && !error && (
                <span className="text-primary-light mt-1 dark:text-accent-gray text-xs self-start">
                  Net Units:{" "}
                  <span className="font-bold text-green-600">
                    {unitsLeft > 0
                      ? stockSelected._id === formData.stock
                        ? unitsLeft + quantity
                        : unitsLeft
                      : unitsLeft}
                  </span>
                </span>
              )}
            </div>

            {/* amount */}
            <div className="relative w-full mt-2 md:mt-4">
              <label
                className="block text-start text-primary-light dark:text-accent-gray text-sm font-bold mb-2"
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                className="appearance-none bg-accent-grayShade dark:bg-primary-glass border focus:border-white rounded w-full py-2 px-3 text-primary-light dark:text-accent-gray leading-tight focus:outline-none focus:ring-white"
                id="amount"
                required
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount eg. 2000, 1000 etc"
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
              } disabled:opacity-50`}
              disabled={loading || error || (stockSelected._id !== formData.stock && unitsLeft < 0)}
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

export default EditSalesModal;
