import { useState } from "react";
import SideNav from "../NavBar/SideNav";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

    return (
      <div className="w-full flex items-start justify-start h-screen bg-primary-light dark:bg-primary-dark text-gray-900 dark:text-gray-100 transition-all ease-in-out duration-700">
        <div
            className={`bg-primary-dark 4 ${isCollapsed ? 'md:w-[10%] lg:w-[5%]' : 'w-[15%] md:w-[25%] lg:w-[20%]'} pt-16 h-screen transition-all ease-in-out duration-700`}
            
          >
            <SideNav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          </div>  
          <div className="">
              {/* content goes here */}
          </div>
      </div>
    );
  }
  