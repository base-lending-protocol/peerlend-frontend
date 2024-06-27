import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
 
    return (
    <div>
    <div className="flex justify-between lg:items-center md:items-center">
        <Sidebar />
        <div className="w-[100%] lg:w-[79%] md:w-[79%] h-[100vh] overflow-y-scroll p-8">
        <Outlet />
        </div>
    </div>
    </div>
  )
}

export default DashboardLayout