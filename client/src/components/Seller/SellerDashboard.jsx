import React from "react";
import {Notifications, Person } from "@mui/icons-material";

// Icons
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerDashboard = () => {
  const user= useSelector((state)=> state.Auth.user)

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-[#0b2652] border-t-1 border-[#a9a9bc7a] text-white flex flex-col">
        <div className="p-4 text-lg font-bold">Menu </div>
        <nav className="flex-1 p-2">

          <button className=" w-full text-left py-2 px-3 mb-3 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-600 rounded flex items-center gap-2">
            <ListAltIcon /> <span>Product List</span>
          </button>
          <button className=" w-full text-left py-2 px-3 mb-3 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-600 rounded flex items-center gap-2">
            <PeopleAltIcon /> <span>Total Users</span>
          </button>
          <button className=" w-full text-left py-2 px-3 mb-3 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-600 rounded flex items-center gap-2">
            <AccountBalanceWalletIcon /> <span>Total Earn</span>
          </button>
          <button className=" w-full text-left py-2 px-3 mb-3 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-600 rounded flex items-center gap-2">
            <FilterFramesIcon /> <span>Total Orders</span>
          </button>

        </nav>
      </aside>

      {/* Main Dashboard Area */}
      <main className="pb-6 flex-1 flex flex-col">
        <header className="flex items-center justify-end p-2 bg-gray-800 text-white">
          <div className="px-4">  <Notifications /></div>
          <div className="flex items-center space-x-2 px-4"><Person /><span>{user.firstname} {user.lastname}</span></div>
        </header>
        <Outlet /> {/* This will render the nested routes for the dashboard */}
      </main>
    </div>
  );
};

export default SellerDashboard;
