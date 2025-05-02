import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import { get } from "../../API/ApiEndPoints";

const SellerProgressCard = () => {
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [totalSeller, setTotalSeller] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await get("/admin/dashboard/getuserstats");
        const stats = res.data.stats.filter(item => item._id.role === "seller");
        setTotalSeller(res.data.totals.seller);

        // calculate percentage change month-wise
        const updatedStats = stats.map((item, index) => {
          if (index === 0) return { ...item, percentage: 0 };
          const lastTotal = stats[index - 1].total;
          const percentChange = ((item.total - lastTotal) / (lastTotal || 1)) * 100;
          return { ...item, percentage: percentChange.toFixed(1) };
        });

        setMonthlyStats(updatedStats);
      } catch (error) {
        console.error("Error fetching seller stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-gray-600">SELLER PROGRESS</p>
        <h3 className="text-lg font-semibold text-gray-800">{totalSeller} Sellers</h3>
        {monthlyStats.slice(-6).map((stat, index) => (
          <div key={index} className="py-1">
            <span className="text-gray-700">{stat._id.month}</span>
            <span className={stat.percentage >= 0 ? "text-green-500 ml-2" : "text-red-500 ml-2"}>
              {stat.percentage >= 0 ? "+" : ""}
              {stat.percentage}% 
            </span>
            <span className="ml-2 text-sm text-gray-500">({stat.total} new)</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SellerProgressCard;
