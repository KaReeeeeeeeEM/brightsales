import { useState } from "react";
import SideNav from "../NavBar/SideNav";
import DashboardContent from "./DashboardContent";
import StockManager from "../StockManager/StockManager";
import ExpenseTracker from "../ExpenseTracker/ExpenseTracker";
import Categories from "../Categories/Categories";
import SuperFilter from "../SuperFilter/SuperFilter";
import Sales from "../Sales/Sales";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState('Dashboard')

    return (
      <div className="w-full h-screen overflow-y-auto flex items-start justify-end bg-[#eee] dark:bg-primary-dark text-gray-900 dark:text-gray-100 transition-all ease-in-out duration-700">
        {/* side navigation bar */}
        <div
            className={`fixed left-0 top-0 bg-gray-700 dark:bg-primary-dark 4 ${isCollapsed ? 'md:w-[10%] lg:w-[5%]' : 'w-[15%] md:w-[25%] lg:w-[20%]'} pt-16 h-screen transition-all ease-in-out duration-700`}       
          >
            <SideNav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}  selected={selected} setSelected={setSelected} />
          </div>  

          {/* content */}
          <div className={`${isCollapsed ? 'w-[85%] md:w-[90%] lg:w-[95%]' : 'w-[85%] md:w-[75%] lg:w-[80%]'} pt-16 md:pt-20 px-2 md:px-4 lg:px-6 h-screen transition-all ease-in-out duration-700`}>
              {selected === 'Dashboard' && <DashboardContent />}
              {selected === 'Stock' && <StockManager />}
              {selected === 'Categories' && <Categories />}
              {selected === 'Expenses' && <ExpenseTracker />}
              {selected === 'Sales' && <Sales />}
              {selected === 'Filter' && <SuperFilter />}
          </div>
      </div>
    );
  }
  