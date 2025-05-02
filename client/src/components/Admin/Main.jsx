import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
} from "@mui/material";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
} from "recharts";


import { get } from "../../API/ApiEndPoints";
import SellerProgressCard from "./SellerProgressCard";
import CustomerProgressCard from "./CustomerProgressCard";

const margin = { right: 24 };
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];
const Main = () => {
    const [totalUser, setTotalUser] = useState(0);
    const [monthlyUserStats, setMonthlyUserStats] = useState([]); // ✅ dynamic chart data

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const res = await get("/admin/dashboard/getuserstats");
                setTotalUser(res.data.totals.totaluser);

                const customerStats = res.data.stats.filter(
                    (item) => item._id.role === "customer"
                );

                // Prepare chart data with newUsers and oldUsers
                const chartData = customerStats.map((item, index) => {
                    const date = new Date(item._id.month + "-01");
                    const monthLabel = date.toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                    });

                    const currentTotal = item.total;
                    const previousTotal = index === 0 ? 0 : customerStats[index - 1].total;

                    return {
                        month: monthLabel,
                        newUsers: currentTotal, // current month users
                        oldUsers: previousTotal, // previous month users
                    };
                });

                setMonthlyUserStats(chartData);
            } catch (error) {
                console.error("Error fetching user stats:", error);
            }
        };

        fetchUserStats();
    }, []);


    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border px-3 py-1 rounded w-60 text-black"
                />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-gray-600">MEMBER PROGRESS</p>
                        <h3 className="text-lg font-semibold text-gray-800">{totalUser}</h3>
                        <p className="text-green-500">Month</p>
                    </CardContent>
                </Card>

                <CustomerProgressCard />
                <SellerProgressCard />

                <Card>
                    <CardContent className="p-4">
                        <p className="text-gray-600">MONTHLY SALES</p>
                        <h3 className="text-lg font-semibold text-gray-800">$13,891</h3>
                        <p className="text-green-500">Month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

                {/* Chart-1 Dynamic */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Member Overview
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={monthlyUserStats}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {/* Previous Users */}
                            <Bar dataKey="oldUsers" name="Old Users" fill="#a855f7" />
                            {/* New Users */}
                            <Bar dataKey="newUsers" name="New Users" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>


                {/* Chart-2 (Static for now) */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Cost Overview
                    </h3>
                    <LineChart
                        width={500}
                        height={300}
                        series={[
                            { data: pData, label: 'pv' },
                            { data: uData, label: 'uv' },
                        ]}
                        xAxis={[{ scaleType: 'point', data: xLabels }]}
                        yAxis={[{ width: 50 }]}
                        margin={margin}
                    />
                </div>

                {/* Chart-3 (Static for now) */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Product Overview
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={monthlyUserStats}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="newUsers" name="New Users" fill="#f59e0b" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Main;
