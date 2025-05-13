import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    Menu as MuiMenu,
    MenuItem,
    IconButton,
} from '@mui/material';
import {
    Menu as MenuIcon,
    X as CloseIcon,
    Settings,
    BarChart2,
    User,
    Layers,
} from 'lucide-react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Dashboard() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

    useEffect(() => {
        const GetUser = async () => {
            try {
                console.log("Fetching users...");
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        GetUser();
    }, []);

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (path) => {
        setAnchorEl(null);
        if (path) navigate(path);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-full bg-gradient-to-r from-[#06204b] to-purple-900 text-white ">

            {/* Sidebar */}
            <aside className={`
            fixed top-0 left-0 h-screen xl:h-[94vh] w-64 bg-[#06204b] p-4 space-y-4 
            transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            xl:translate-x-0 xl:static xl:block transition-transform duration-300 ease-in-out z-50
`}>
                {/* Sidebar Header */}
                <div className="flex justify-between items-center xl:hidden">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button onClick={toggleSidebar} className="text-white p-2 cursor-pointer">
                        <CloseIcon />
                    </button>
                </div>

                <nav className="space-y-2 border-t-2 mt-4">
                    {/* Profile Button with Dropdown */}
                    <>
                        <button
                            onClick={handleProfileClick}
                            className="flex items-center gap-2 w-full p-2 hover:bg-gray-800 rounded cursor-pointer"
                        >
                            <User /> Profile
                        </button>
                        <MuiMenu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => handleClose()}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            PaperProps={{
                                sx: {
                                    backgroundColor: '#1f2937',
                                    color: 'white',
                                    borderRadius: 2,
                                    boxShadow: 5,
                                    minWidth: 180,
                                },
                            }}
                            MenuListProps={{
                                sx: { py: 0.5 },
                            }}
                        >
                            <MenuItem onClick={() => handleClose('/admin/dashboard/alladmin')} sx={{ '&:hover': { backgroundColor: '#374151' }, display: 'flex', gap: 1 }}>
                                <User size={18} /> Admin
                            </MenuItem>
                            <MenuItem onClick={() => handleClose('/admin/dashboard/allcustomer')} sx={{ '&:hover': { backgroundColor: '#374151' }, display: 'flex', gap: 1 }}>
                                <User size={18} /> Customer
                            </MenuItem>
                            <MenuItem onClick={() => handleClose('/admin/dashboard/allseller')} sx={{ '&:hover': { backgroundColor: '#374151' }, display: 'flex', gap: 1 }}>
                                <User size={18} /> Seller
                            </MenuItem>
                        </MuiMenu>
                    </>

                    {/* Add navigation to buttons */}
                    <button
                        onClick={() => navigate('/admin/dashboard/category')}
                        className="flex items-center gap-2 w-full p-2 hover:bg-gray-800 rounded cursor-pointer"
                    >
                        <AddCircleIcon /> Add Categories
                    </button>

                    <button
                        onClick={() => navigate('/admin/dashboard/payment')}
                        className="flex items-center gap-2 w-full p-2 hover:bg-gray-800 rounded cursor-pointer"
                    >
                        <BarChart2 /> Payment
                    </button>

                    <button
                        onClick={() => navigate('/admin/dashboard/notification')}
                        className="flex items-center gap-2 w-full p-2 hover:bg-gray-800 rounded cursor-pointer"
                    >
                        Notification
                    </button>

                    <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-800 rounded cursor-pointer">
                        <Layers /> Multi Level
                    </button>

                    <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-800 rounded cursor-pointer">
                        <Settings /> Setting
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white rounded-tl-3xl p-6 overflow-y-auto text-black relative ">

                {/* Mobile Toggle Button - hidden on xl and up */}
                <div className="xl:hidden mb-4">
                    <IconButton onClick={toggleSidebar} sx={{ color: '#06204b', backgroundColor: '#f0f0f0' }}>
                        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                </div>


                <Outlet /> {/* This renders nested routes */}
            </main>
        </div>
    );
}
