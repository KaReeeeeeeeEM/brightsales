import { useEffect } from "react";
import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import TopAppBar from "./components/NavBar/TopAppBar";


function App() {
  const [theme, setTheme] = useState('light');

    // Effect to load saved theme from local storage (if available)
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }, []);

    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);

      document.documentElement.classList.remove(theme);
      document.documentElement.classList.add(newTheme);

      // Save the theme in local storage
      localStorage.setItem('theme', newTheme);
    };


  return (
    <div className="flex flex-col">
       <TopAppBar theme={theme} toggleTheme={toggleTheme} />
       <Dashboard />
    </div>
  );
}

export default App;
