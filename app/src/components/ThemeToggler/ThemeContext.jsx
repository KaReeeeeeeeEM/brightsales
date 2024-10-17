/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';

// Create the context
export const ThemeContext = createContext();

// Create the provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme && savedTheme.includes('system')) {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDarkScheme ? 'system-dark' : 'system-light';
      setTheme(systemTheme);
      document.documentElement.classList.add(prefersDarkScheme ? 'dark' : 'light');
    } else if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      setTheme('light');
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = (selectedTheme) => {
    let newTheme = selectedTheme;

    if (selectedTheme === 'system') {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      newTheme = prefersDarkScheme ? 'system-dark' : 'system-light';
    }

    setTheme(newTheme);

    // Remove the previously applied theme classes
    document.documentElement.classList.remove('light', 'dark');

    // Add the new theme class
    document.documentElement.classList.add(
      newTheme.includes('system') ? newTheme.split('-')[1] : newTheme
    );

    // Save the new theme to localStorage
    localStorage.setItem('theme', selectedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
