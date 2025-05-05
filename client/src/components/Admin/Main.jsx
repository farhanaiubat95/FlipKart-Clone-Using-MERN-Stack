import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import { get } from "../../API/ApiEndPoints";
import { Link } from "react-router-dom";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"];

const Main = () => {
    const [totalUser, setTotalUser] = useState(0);
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [totalSeller, setTotalSeller] = useState(0);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await get("/admin/dashboard/getuser");
            const userData = response.data.counts.totalUser;
            const customerData = response.data.counts.totalCustomer;
            const sellerData = response.data.counts.totalSeller;

            console.log(userData);
            console.log(customerData);
            console.log(sellerData);
            setTotalUser(userData);
            setTotalCustomer(customerData);
            setTotalSeller(sellerData);
        } catch (error) {
            console.error("Error fetching users data:", error);
        }
    };

    return (
        <div>

            <h2 className="text-2xl font-bold text-gray-800 mb-10">Admin Dashboard</h2>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

                {/* Total Members Card */}
                <Card className="shadow-md rounded-xl">
                    <CardContent className="pt-6 bg-purple-200 rounded-lg">
                        <p className="text-gray-600">TOTAL MEMBERS</p>
                        <h3 className="text-2xl font-bold text-purple-700">{totalUser}</h3>
                        <h5 className="text-sm text-gray-600 mt-5"> More Details</h5>
                    </CardContent>
                </Card>

                {/* Total Customers Card */}
                <Card className="shadow-md rounded-xl">
                    <CardContent className="pt-6 bg-blue-100 rounded-lg">
                        <p className="text-gray-600">TOTAL CUSTOMERS</p>
                        <h3 className="text-2xl font-bold text-blue-700">{totalCustomer}</h3>
                        <h5 className="text-sm text-gray-600 mt-5"> <Link className="text-blue-600" to="/admin/dashboard/allcustomer">More Details</Link></h5>
                    </CardContent>
                </Card>

                {/* Total Sellers Card */}
                <Card className="shadow-md rounded-xl">
                    <CardContent className="pt-6 bg-green-100 rounded-lg">
                        <p className="text-gray-600">TOTAL SELLERS</p>
                        <h3 className="text-2xl font-bold text-green-700">{totalSeller}</h3>
                        <h5 className="text-sm text-gray-600 mt-5"> <Link className="text-blue-600" to="/admin/dashboard/allseller">More Details</Link></h5>
                    </CardContent>
                </Card>


            </div>

            {/* Charts Section */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Chart 1 - Cost Overview (static) */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Cost Overview</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={xLabels.map((x, i) => ({ name: x, uv: uData[i], pv: pData[i] }))}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#10b981" />
                            <Bar dataKey="uv" fill="#f59e0b" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Chart 2 - Product Overview */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Product Overview</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={xLabels.map((x, i) => ({ name: x, uv: uData[i], pv: pData[i] }))}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#a855f7" />
                            <Bar dataKey="uv" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default Main;
