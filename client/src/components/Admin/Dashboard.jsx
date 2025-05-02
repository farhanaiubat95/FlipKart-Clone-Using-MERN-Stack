import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Menu as MuiMenu,
    MenuItem,
    Button,
    IconButton,
} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {
    Menu,
    Search,
    Settings,
    LogOut,
    BarChart2,
    User,
    Layers,
} from 'lucide-react';

const data = [
    { year: '1990', income: 400, expense: 240 },
    { year: '1995', income: 600, expense: 300 },
    { year: '2000', income: 800, expense: 400 },
    { year: '2005', income: 1600, expense: 900 },
    { year: '2010', income: 2200, expense: 1100 },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const GetUser = async () => {
            // Fetch users from the server
            try {
                const request = await get('/admin/getuser');
                const response = request.data;
                console.log(response);

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        GetUser();
    }, [])


    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = (path) => {
        setAnchorEl(null);
        if (path) navigate(path);
    };

    return (
        <div className="flex h-screen bg-gradient-to-r from-blue-900 to-purple-900 text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-[#456291] p-4 space-y-4 hidden md:block">

                <nav className="space-y-2">
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
                                    backgroundColor: '#1f2937', // Tailwind's gray-800
                                    color: 'white',
                                    borderRadius: 2,
                                    boxShadow: 5,
                                    minWidth: 180,
                                },
                            }}
                            MenuListProps={{
                                sx: {
                                    py: 0.5,
                                },
                            }}
                        >
                            <MenuItem
                                onClick={() => handleClose('/admin/dashboard/alladmin')}
                                sx={{
                                    '&:hover': { backgroundColor: '#374151' }, // gray-700
                                    display: 'flex',
                                    gap: 1,
                                }}
                            >
                                <User size={18} /> Admin
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleClose('/admin/dashboard/allcustomer')}
                                sx={{
                                    '&:hover': { backgroundColor: '#374151' },
                                    display: 'flex',
                                    gap: 1,
                                }}
                            >
                                <User size={18} /> Customer
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleClose('/admin/dashboard/allseller')}
                                sx={{
                                    '&:hover': { backgroundColor: '#374151' },
                                    display: 'flex',
                                    gap: 1,
                                }}
                            >
                                <User size={18} /> Seller
                            </MenuItem>
                        </MuiMenu>
                    </>

                    <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-800 rounded cursor-pointer">
                        <BarChart2 /> Payment
                    </button>
                    <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-800 rounded cursor-pointer">
                        <Layers /> Multi Level
                    </button>
                    <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-800 rounded cursor-pointer">
                        Notification
                    </button>
                    <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-800 rounded cursor-pointer">
                        <Settings /> Setting
                    </button>
                </nav>

            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white rounded-tl-3xl p-6 overflow-y-auto text-black">
                <Outlet /> {/*This renders nested routes like /admin/dashboard/alladmin */}
            </main>
        </div>
    );
}
