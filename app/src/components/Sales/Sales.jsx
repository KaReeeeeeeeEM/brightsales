/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaChartBar, FaPlus } from "react-icons/fa";
import SalesCard from "./components/SalesCard";
import axios from "axios";
import SalesModal from "./components/SalesModal";

function Sales() {
  const [sales, setSales] = useState([]);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSalesModal, setOpenSalesModal] = useState(false);

  const fetchSales = async () => {
    setLoading(true)
    await axios
      .get("http://localhost:10000/sales")
      .then((res) => {
        setLoading(false)
        setSales(
          res.data.data
            .filter(
              (f) =>
                f.seller && f.seller._id === localStorage.getItem("smartId")
            )
            .reverse()
        );
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      }
      )
      .finally(
        () => setLoading(false)
      )
  };

  const fetchStock = async () => {
    setLoading(true)
    await axios
      .get("http://localhost:10000/stock")
      .then((res) => {
        setLoading(false)
        setStock(
          res.data.data
            .filter(
              (f) =>
                f.seller && f.seller._id === localStorage.getItem("smartId")
            )
            .filter(
              (s) =>
                (s.type.toLowerCase().trim() !== "capital" ||
                  !s.type.toLowerCase().trim().includes("capital")) &&
                (s.type.toLowerCase().trim() !== "mtaji" ||
                  !s.type.toLowerCase().trim().includes("mtaji")) &&
                (s.type.toLowerCase().trim() !== "kianzio" ||
                  !s.type.toLowerCase().trim().includes("kianzio"))
            )
            .reverse()
        );
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
      .finally(() => setLoading(false))
  };

  useEffect(() => {
    fetchSales();
    fetchStock();
  }, []);

  const toggleOpenModal = () => setOpenSalesModal(!openSalesModal);

  return (
    <div className="w-full h-[100vh]">
      {openSalesModal && (
        <SalesModal
          onClose={toggleOpenModal}
          callback={fetchSales}
          stock={stock}
          sales={sales}
        />
      )}
      {/* title */}
      <span className="w-full mt-2 md:mt-0 flex items-center justify-between text-primary-dark dark:text-primary-light font-bold text-lg md:text-xl lg:text-2xl">
        <span className="flex items-center">
          <FaChartBar className="mr-2" />
          Sales (
          <span className="text-primary-dark dark:text-accent-gray">
            {!loading && sales && sales.reduce((a, e) => (a += e.amount), 0) > 1000000
              ? sales.reduce((a, e) => (a += e.amount), 0) / 1000000 + "M"
              : sales.reduce((a, e) => (a += e.amount), 0) > 1000
              ? sales.reduce((a, e) => (a += e.amount), 0) / 1000 + "k"
              : sales.reduce((a, e) => (a += e.amount), 0)}
          </span>
          )
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
        {
          loading ?
        <span className="w-full text-primary-dark dark:text-accent-darkGray text-center text-sm">Fetching sales...</span>
        :
        sales && sales.length === 0 ? (
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
              sales={sales}
              quantity={s.quantity}
              stockSelected={s.stock ? s.stock : "Stock removed"}
              name={s.stock ? s.stock.name : "Stock name not present"}
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
