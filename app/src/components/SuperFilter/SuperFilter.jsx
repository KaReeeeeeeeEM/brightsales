/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import SalesCard from "../Sales/components/SalesCard";
import CategoriesCard from "../Categories/components/CategoriesCard";
import StockCard from "./components/StockCard";
import ExpenseCard from "../ExpenseTracker/components/ExpenseCard";

function SuperFilter() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [stock, setStock] = useState([]);
  const [sales, setSales] = useState([]);
  const [results, setResults] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchAllTypes = async () => {
    setLoading(true);
    const allStock = await axios.get("https://oyster-app-k8jcp.ondigitalocean.app/stock");
    const allSales = await axios.get("https://oyster-app-k8jcp.ondigitalocean.app/sales");
    const allCategories = await axios.get("https://oyster-app-k8jcp.ondigitalocean.app/categories");
    const allExpenses = await axios.get("https://oyster-app-k8jcp.ondigitalocean.app/expenses");

    setStock(
      allStock.data.data
        .filter(
          (f) => f.seller && f.seller._id === localStorage.getItem("smartId")
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
    setSales(
      allSales.data.data
        .filter(
          (f) => f.seller && f.seller._id === localStorage.getItem("smartId")
        )
        .reverse()
    );
    setCategories(
      allCategories.data.data
        .filter(
          (f) => f.seller && f.seller._id === localStorage.getItem("smartId")
        )
        .reverse()
    );
    setExpenses(
      allExpenses.data.data
        .filter(
          (f) => f.seller && f.seller._id === localStorage.getItem("smartId")
        )
        .reverse()
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchAllTypes();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    if (query !== "" && query.includes(":")) {
      const typeChosen = query.split(":")[0].toLowerCase().trim();
      const keywordChosen = query.split(":")[1].toLowerCase().trim();

      setType(typeChosen);
      setKeyword(keywordChosen);

      if (typeChosen === "stock") {
        setResults(stock);
      } else if (typeChosen === "expenses") {
        setResults(expenses);
      } else if (typeChosen === "sales") {
        setResults(sales);
      } else if (typeChosen === "category") {
        setResults(categories);
      } else {
        setResults([]);
      }
      setLoading(false);
    } else {
      setLoading(true);
      setType("");
      setResults([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [query]);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
        {/* title */}
        <span className="mt-2 md:mt-0 flex items-center text-primary-dark dark:text-primary-light font-bold text-lg md:text-xl lg:text-2xl">
          <FaFilter className="mr-2" />
          Super Filter
        </span>
        {/* search bar */}
        <form className="mt-4">
          <input
            type="text"
            name="query"
            autoFocus={true}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="appearance-none w-full md:w-auto mt-2 md:mt-0 px-4 py-2 bg-accent-gray dark:bg-primary-glass text-accent-darkGray dark:text-accent-gray rounded-md focus:outline-none ring-accent-gray focus:border-none focus:ring-1 focus:ring-accent-gray"
            placeholder="Search for anything"
          />
        </form>
      </div>

      {/* insights */}
      <p className="text-sm text-accent=darkGray dark:text-accent-gray mt-4">
        Search for anything in the format{" "}
        <span className="p-1 bg-accent-darkGray dark:bg-accent-grayShade rounded-md text-accent-gray mx-1 font-semibold px-2">
          type: keyword
        </span>{" "}
        where{" "}
        <span className="p-1 bg-accent-darkGray dark:bg-accent-grayShade rounded-md text-accent-gray mx-1 font-semibold px-2">
          type
        </span>{" "}
        can be either <span className="italic font-semibold">sales</span>,{" "}
        <span className="italic font-semibold">expenses</span>,{" "}
        <span className="italic font-semibold">category</span> or{" "}
        <span className="italic font-semibold">stock</span> and the keyword
        could be anything. Try searching for{" "}
        <span className="p-1 bg-accent-darkGray dark:bg-accent-grayShade rounded-md text-accent-gray mx-1 font-semibold px-2">
          category : *{" "}
        </span>{" "}
        for all categories. Find anything in any category.
      </p>
      {type && (
        <div className="text-primary-dark dark:text-accent-gray text-sm mt-8 text-center">
          Search Results for{" "}
          <span className="mt-4 text-md lg:text-lg font-semibold text-primary-dark dark:text-accent-gray italic">
            {type}

            {/* total for stock */}
            {type === "stock" && (
              <span className="text-primary-dark dark:text-accent-gray ml-1">
                (
                {stock &&
                (keyword === ""
                  ? stock
                  : stock.filter(
                      (st) =>
                        st !== null &&
                        st.name.toLowerCase().trim().includes(keyword)
                    )
                ).reduce(
                  (a, s) =>
                    (a += isNaN(s.quantity)
                      ? parseInt(s.quantity.split(" ").filter((q) => !isNaN(q)))
                      : parseInt(s.quantity) - sales.filter(sa => sa.stock !== null && sa.stock._id === s._id).reduce((ac,sal) => ac += sal.quantity ,0)),
                  0
                ) > 1000000
                  ? (keyword === ""
                      ? stock
                      : stock.filter(
                          (st) =>
                            st !== null &&
                            st.name.toLowerCase().trim().includes(keyword)
                        )
                    ).reduce(
                      (a, s) =>
                        (a += isNaN(s.quantity)
                          ? parseInt(
                              s.quantity.split(" ").filter((q) => !isNaN(q))
                            )
                          : parseInt(s.quantity) - sales.filter(sa => sa.stock !== null && sa.stock._id === s._id).reduce((ac,sal) => ac += sal.quantity ,0)),
                      0
                    ) /
                      1000000 +
                    "M"
                  : (keyword === ""
                      ? stock
                      : stock.filter(
                          (st) =>
                            st !== null &&
                            st.name.toLowerCase().trim().includes(keyword)
                        )
                    ).reduce(
                      (a, s) =>
                        (a += isNaN(s.quantity)
                          ? parseInt(
                              s.quantity.split(" ").filter((q) => !isNaN(q))
                            )
                          : parseInt(s.quantity) - sales.filter(sa => sa.stock !== null && sa.stock._id === s._id).reduce((ac,sal) => ac += sal.quantity ,0)),
                      0
                    ) > 1000
                  ? (keyword === ""
                      ? stock
                      : stock.filter(
                          (st) =>
                            st !== null &&
                            st.name.toLowerCase().trim().includes(keyword)
                        )
                    ).reduce(
                      (a, s) =>
                        (a += isNaN(s.quantity)
                          ? parseInt(
                              s.quantity.split(" ").filter((q) => !isNaN(q))
                            )
                          : parseInt(s.quantity) - sales.filter(sa => sa.stock !== null && sa.stock._id === s._id).reduce((ac,sal) => ac += sal.quantity ,0)),
                      0
                    ) /
                      1000 +
                    "k"
                  : (keyword === ""
                      ? stock
                      : stock.filter(
                          (st) =>
                            st !== null &&
                            st.name.toLowerCase().trim().includes(keyword)
                        )
                    ).reduce(
                      (a, s) =>
                        (a += isNaN(s.quantity)
                          ? parseInt(
                              s.quantity.split(" ").filter((q) => !isNaN(q))
                            )
                          : parseInt(s.quantity) - sales.filter(sa => sa.stock !== null && sa.stock._id === s._id).reduce((ac,sal) => ac += sal.quantity ,0)),
                      0
                    )}
                )
              </span>
            )}

            {/* total for sales */}
            {type === "sales" && (
              <span className="text-primary-dark dark:text-accent-gray ml-1">
                (
                {sales &&
                (keyword === ""
                  ? sales
                  : sales.filter(
                      (st) =>
                        st.stock !== null &&
                        st.stock.name.toLowerCase().trim().includes(keyword)
                    )
                ).reduce((a, e) => (a += e.amount), 0) > 1000000
                  ? (keyword === ""
                      ? sales
                      : sales.filter(
                          (st) =>
                            st.stock !== null &&
                            st.stock.name.toLowerCase().trim().includes(keyword)
                        )
                    ).reduce((a, e) => (a += e.amount), 0) /
                      1000000 +
                    "M"
                  : (keyword === ""
                      ? sales
                      : sales.filter(
                          (st) =>
                            st.stock !== null &&
                            st.stock.name.toLowerCase().trim().includes(keyword)
                        )
                    ).reduce((a, e) => (a += e.amount), 0) > 1000
                  ? (keyword === ""
                      ? sales
                      : sales.filter(
                          (st) =>
                            st.stock !== null &&
                            st.stock.name.toLowerCase().trim().includes(keyword)
                        )
                    ).reduce((a, e) => (a += e.amount), 0) /
                      1000 +
                    "k"
                  : (keyword === ""
                      ? sales
                      : sales.filter(
                          (st) =>
                            st.stock !== null &&
                            st.stock.name.toLowerCase().trim().includes(keyword)
                        )
                    ).reduce((a, e) => (a += e.amount), 0)}
                )
              </span>
            )}

            {/* total for expenses */}
            {type === "expenses" && (
              <span className="text-primary-dark dark:text-accent-gray ml-1">
                (
                {expenses &&
                (keyword === ""
                  ? expenses
                  : expenses.filter(
                      (st) =>
                        st !== null &&
                        st.name.toLowerCase().trim().includes(keyword)
                    )
                ).reduce((a, e) => (a += e.cost), 0) > 1000000
                  ? (keyword === ""
                      ? expenses
                      : expenses.filter(
                          (st) =>
                            st !== null &&
                            st.name.toLowerCase().trim().includes(keyword)
                        )
                    ).reduce((a, e) => (a += e.cost), 0) /
                      1000000 +
                    "M"
                  : (keyword === ""
                      ? expenses
                      : expenses.filter(
                          (st) =>
                            st !== null &&
                            st.name.toLowerCase().trim().includes(keyword)
                        )
                    ).reduce((a, e) => (a += e.cost), 0) > 1000
                  ? (keyword === ""
                      ? expenses
                      : expenses.filter(
                          (st) =>
                            st !== null &&
                            st.name.toLowerCase().trim().includes(keyword)
                        )
                    ).reduce((a, e) => (a += e.cost), 0) /
                      1000 +
                    "k"
                  : (keyword === ""
                      ? expenses
                      : expenses.filter(
                          (st) =>
                            st !== null &&
                            st.name.toLowerCase().trim().includes(keyword)
                        )
                    ).reduce((a, e) => (a += e.cost), 0)}
                )
              </span>
            )}

            {/* total for categories */}
            {type === "category" && (
              <span className="text-primary-dark dark:text-accent-gray ml-1">
                (
                {categories &&
                (keyword === ""
                  ? categories
                  : categories.filter(
                      (st) =>
                        st !== null &&
                        st.name.toLowerCase().trim().includes(keyword)
                    )
                ).length > 1000000
                  ? (keyword === ""
                      ? categories
                      : categories.filter(
                          (st) =>
                            st !== null &&
                            st.name.toLowerCase().trim().includes(keyword)
                        )
                    ).length /
                      1000000 +
                    "M"
                  : (keyword === ""
                      ? categories
                      : categories.filter(
                          (st) =>
                            st !== null &&
                            st.name.toLowerCase().trim().includes(keyword)
                        )
                    ).length > 1000
                  ? (keyword === ""
                      ? categories
                      : categories.filter(
                          (st) =>
                            st !== null &&
                            st.name.toLowerCase().trim().includes(keyword)
                        )
                    ).length /
                      1000 +
                    "k"
                  : (keyword === ""
                      ? categories
                      : categories.filter(
                          (st) =>
                            st !== null &&
                            st.name.toLowerCase().trim().includes(keyword)
                        )
                    ).length}
                )
              </span>
            )}
          </span>{" "}
        </div>
      )}

      {/* search results */}
      <div className="w-full flex flex-col md:flex-row flex-wrap md:my-8 py-2">
        {loading ? (
          <span className="w-full text-primary-dark dark:text-accent-darkGray text-center text-sm">
            Filtering...
          </span>
        ) : (
          type === "sales" &&
          (keyword === ""
            ? sales
            : sales.filter(
                (st) =>
                  st.stock !== null &&
                  st.stock.name.toLowerCase().trim().includes(keyword)
              )
          ).map((s) => (
            <SalesCard
              id={s._id}
              key={s._id}
              stock={stock}
              sellingPrice={s.sellingPrice}
              stockSelected={s.stock ? s.stock : "Stock removed"}
              name={s.stock ? s.stock.name : "Stock name not present"}
              amount={s.amount}
              date={s.date}
              quantity={s.quantity}
              seller={s.seller}
              created={s.createdAt}
              updated={s.updatedAt}
              callback={fetchAllTypes}
            />
          ))
        )}

        {loading ? (
          <span className="w-full text-primary-dark dark:text-accent-darkGray text-center text-sm">
            Filtering...
          </span>
        ) : (
          type === "category" &&
          (keyword === ""
            ? categories
            : categories.filter((st) =>
                st.name.toLowerCase().trim().includes(keyword)
              )
          ).map((c) => (
            <CategoriesCard
              id={c._id}
              key={c._id}
              name={c.name}
              date={c.createdAt}
              seller={c.seller}
              created={c.createdAt}
              updated={c.updatedAt}
              callback={fetchAllTypes}
            />
          ))
        )}

        {loading ? (
          <span className="w-full text-primary-dark dark:text-accent-darkGray text-center text-sm">
            Filtering...
          </span>
        ) : (
          type === "stock" &&
          (keyword === ""
            ? stock
            : stock.filter((st) =>
                st.name.toLowerCase().trim().includes(keyword)
              )
          ).map((s) => (
            <StockCard
              id={s._id}
              key={s._id}
              name={s.name}
              type={s.type}
              sales={sales}
              categories={categories}
              unitPrice={s.unitPrice}
              quantity={s.quantity}
              date={s.date}
              seller={s.seller}
              created={s.createdAt}
              updated={s.updatedAt}
              callback={fetchAllTypes}
            />
          ))
        )}

        {loading ? (
          <span className="w-full text-primary-dark dark:text-accent-darkGray text-center text-sm">
            Filtering...
          </span>
        ) : (
          type === "expenses" &&
          (keyword === ""
            ? expenses
            : expenses.filter((st) =>
                st.name.toLowerCase().trim().includes(keyword)
              )
          ).map((e) => (
            <ExpenseCard
              id={e._id}
              key={e._id}
              name={e.name}
              cost={e.cost}
              date={e.date}
              seller={e.seller}
              created={e.createdAt}
              updated={e.updatedAt}
              callback={fetchAllTypes}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default SuperFilter;
