import { useState } from "react";
import SideNav from "../NavBar/SideNav";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(true);

    return (
      <div className="w-full flex items-start justify-start h-screen bg-primary-light dark:bg-primary-dark text-gray-900 dark:text-gray-100">
          <div className={`mt-16 h-screen ${isCollapsed? 'w-auto' : 'w-1/5'}`}>
            <SideNav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          </div>  
          <div className="">

          </div>
      </div>
    );
  }
  