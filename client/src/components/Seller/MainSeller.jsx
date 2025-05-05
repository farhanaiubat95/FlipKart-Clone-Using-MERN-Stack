import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart2, ShoppingCart, Phone } from "lucide-react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';

const chartData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Signups",
      backgroundColor: "#3B82F6",
      borderRadius: 6,
      data: [5, 9, 2, 3, 1],
    },
  ],
};

const MainSeller = () => {
  return (
    <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-10">Seller Dashboard</h2>
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sign ups Card */}
        <Card className="bg-blue-500 text-white">
          <CardContent className="flex justify-between items-center">
            <div>
              <Typography variant="h6">Sign ups</Typography>
              <Typography variant="h4">114</Typography>
              <Typography variant="body2">+25% from last month</Typography>
            </div>
            <BarChart2 className="text-white text-3xl" />
          </CardContent>
        </Card>

        {/* Revenue Card */}
        <Card className="bg-green-500 text-white">
          <CardContent className="flex justify-between items-center">
            <div>
              <Typography variant="h6">Revenue</Typography>
              <Typography variant="h4">$25,541</Typography>
              <Typography variant="body2">+17.5% from last month</Typography>
            </div>
            <ShoppingCart className="text-white text-3xl" />
          </CardContent>
        </Card>

        {/* Open Tickets Card */}
        <Card className="bg-red-500 text-white">
          <CardContent className="flex justify-between items-center">
            <div>
              <Typography variant="h6">Open tickets</Typography>
              <Typography variant="h4">5</Typography>
            </div>
            <Phone className="text-white text-3xl" />
          </CardContent>
        </Card>
      </div>

      {/* Chart and Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Bar Chart
            </Typography>
            <Bar data={chartData} />
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <ul className="space-y-2">
              <li className="flex justify-between border-b pb-1">
                <span>New comment</span>
                <span className="text-sm text-gray-500">21 days ago</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>New comment</span>
                <span className="text-sm text-gray-500">21 days ago</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>New comment</span>
                <span className="text-sm text-gray-500">21 days ago</span>
              </li>
              <li className="text-blue-500 mt-2 cursor-pointer hover:underline">
                Show all
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MainSeller;
