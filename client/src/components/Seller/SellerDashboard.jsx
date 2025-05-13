import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Notifications,
  Person,
  ListAlt as ListAltIcon,
  PeopleAlt as PeopleAltIcon,
  AccountBalanceWallet as WalletIcon,
  FilterFrames as FilterFramesIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.Auth.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen xl:h-[94vh] w-64 bg-[#0b2652] text-white p-4 space-y-4 
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          xl:translate-x-0 xl:static xl:block transition-transform duration-300 ease-in-out z-50
        `}
      >
        {/* Sidebar Header for Small Screens */}
        <div className="flex justify-between items-center xl:hidden">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={toggleSidebar} className="text-white p-2 cursor-pointer">
            <CloseIcon />
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="space-y-2 border-t-2 pt-4">
          <button
            className="w-full text-left cursor-pointer py-2 px-3 flex items-center gap-2 hover:bg-gray-600 rounded"
            onClick={() => navigate("/seller/dashboard/products")}
          >
            <ListAltIcon /> <span>Products</span>
          </button>

          <button className="w-full text-left cursor-pointer py-2 px-3 flex items-center gap-2 hover:bg-gray-600 rounded">
            <PeopleAltIcon /> <span>Total Users</span>
          </button>

          <button className="w-full text-left cursor-pointer py-2 px-3 flex items-center gap-2 hover:bg-gray-600 rounded">
            <WalletIcon /> <span>Total Earn</span>
          </button>

          <button className="w-full text-left py-2 px-3 flex items-center gap-2 hover:bg-gray-600 rounded">
            <FilterFramesIcon /> <span>Total Orders</span>
          </button>
        </nav>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 bg-white rounded-tl-3xl cursor-pointer p-6 overflow-y-auto text-black relative">
        {/* Mobile Toggle Button - Hidden on xl */}
        <div className="xl:hidden mb-4">
          <IconButton
            onClick={toggleSidebar}
            sx={{ color: '#0b2652', backgroundColor: '#f0f0f0' }}
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>

        {/* Top Right Header */}
        <header className="flex items-center justify-end p-2 bg-gray-800 text-white rounded">
          <div className="px-4"><Notifications /></div>
          <div className="flex items-center space-x-2 px-4">
            <Person />
            <span>{user.firstname} {user.lastname}</span>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
};

export default SellerDashboard;
