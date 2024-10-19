/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaCalendar, FaChartBar, FaCoins, FaPlus } from "react-icons/fa";
import SalesCard from "./components/SalesCard";
import axios from "axios";
import SalesModal from "./components/SalesModal";

function Sales() {
  const [sales, setSales] = useState([]);
  const [stock, setStock] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openSalesModal, setOpenSalesModal] = useState(false);

  const fetchSales = async () => {
    await axios
      .get("http://localhost:10000/sales")
      .then(res => {
        console.log(res.data.data)
        setSales(res.data.data.filter(f => f.seller._id === localStorage.getItem('smartId')).reverse());
      })
      .catch((err) => console.log(err));
  };

  const fetchStock = async () => {
    await axios
      .get("http://localhost:10000/stock")
      .then(res => {
        console.log(res.data.data)
        setStock(res.data.data.filter(f => f.seller._id === localStorage.getItem('smartId')).reverse());
      })
      .catch((err) => console.log(err));
  };

  // Function to filter stock based on the date range
  const filteredExpenses = sales.filter((sale) => {
    const saleCreatedAt = new Date(sale.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return saleCreatedAt >= start && saleCreatedAt <= end;
    } else if (start) {
      return saleCreatedAt >= start;
    } else if (end) {
      return saleCreatedAt <= end;
    }
    return true;
  });

  useEffect(() => {
    fetchSales();
    fetchStock();
  }, []);

  const toggleOpenModal = () => setOpenSalesModal(!openSalesModal);

  return (
    <div className="w-full h-[100vh]">
      {openSalesModal && (
        <SalesModal onClose={toggleOpenModal} callback={fetchSales} stock={stock} />
      )}
      {/* title */}
      <span className="w-full mt-2 md:mt-0 flex items-center justify-between text-primary-dark dark:text-primary-light font-bold text-lg md:text-xl lg:text-2xl">
        <span className="flex items-center">
          <FaChartBar className="mr-2" />
          Sales (<span className="text-primary-dark dark:text-accent-gray">{sales.length}</span>)
        </span>
        <span>
          <button
            onClick={toggleOpenModal}
            className="flex items-center text-sm md:text-md bg-accent-grayShade dark:bg-primary-glass"
          >
            New Sale
            <FaPlus className="ml-2" />
          </button>
        </span>
      </span>

      <div className="w-full flex flex-col md:flex-row flex-wrap my-8 py-2">
        {sales && sales.length === 0 ? (
          <span className="w-full text-primary-dark dark:text-accent-darkGray text-center text-sm">
            There are no sales recorded
          </span>
        ) : (
          sales &&
          sales.map((s) => (
            <SalesCard
              id={s._id}
              key={s._id}
              stock={stock}
              stockSelected={s.stock ? s.stock : 'Stock removed'}
              name={s.stock ? s.stock.name : 'Stock name not present'}
              amount={s.amount}
              date={s.date}
              seller={s.seller}
              created={s.createdAt}
              updated={s.updatedAt}
              callback={fetchSales}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Sales;
