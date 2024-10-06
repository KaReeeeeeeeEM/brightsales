import { FaSun, FaMoon } from 'react-icons/fa'; // Importing the icons from React Icons

export default function ThemeToggler({ toggleTheme, theme }) {
  return (
    <div className="flex items-center">
      <button 
        onClick={toggleTheme} 
        className={`flex items-center text-sm px-4 py-2 rounded-md transition-colors duration-200 ${
          theme === 'light' ? 'bg-primary-dark text-white' : 'bg-primary-light text-gray-900'
        }`}
      >
        {theme === 'light' ? (
          <>
            <FaMoon className="mr-2" /> {/* Moon icon for dark mode */}
            Dark Mode
          </>
        ) : (
          <>
            <FaSun className="mr-2" /> {/* Sun icon for light mode */}
            Light Mode
          </>
        )}
      </button>
    </div>
  );
}
