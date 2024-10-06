import React from 'react'

function SideNav({isCollapsed,setIsCollapsed}) {
  return (
    <div className={`${isCollapsed ? 'p-2' : ''} bg-primary-dark text-primary-light`}>
        SideNav
    </div>
  )
}

export default SideNav