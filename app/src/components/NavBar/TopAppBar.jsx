/* eslint-disable react/prop-types */
import ThemeToggler from '../ThemeToggler/ThemeToggler'

function TopAppBar({theme, toggleTheme}) {
  return (
    <div>
        <nav className="fixed w-screen flex items-center justify-between bg-primary-dark text-white dark:text-gray-200 shadow-lg">
          <span className="flex items-center font-bold text-2xl">
            <img src='/logo-dark.png' alt='logo' className='w-12 h-12 lg:w-16 lg:h-16' />
         </span>
          <div className="flex items-center">
            <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
          </div>
        </nav>
    </div>
  )
}

export default TopAppBar