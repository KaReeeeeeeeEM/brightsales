import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import TopAppBar from "./components/NavBar/TopAppBar";

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme.includes('system')) {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDarkScheme ? 'dark' : 'light';
      setTheme(savedTheme);
      document.documentElement.classList.add(systemTheme);
    } else if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      setTheme('light');
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = (system) => {
    const newTheme = system ? system : theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme.includes('system') ? newTheme.split('-')[1] : newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme.includes('system') ? newTheme.split('-')[1] : newTheme);
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
