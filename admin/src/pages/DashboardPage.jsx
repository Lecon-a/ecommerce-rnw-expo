import React from "react";
import { useQuery } from "@tanstack/react-query";
import { orderApi, statsApi } from "../lib/api";
import {
  DollarSignIcon,
  PackageIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "lucide-react";

const DashboardPage = () => {
  const { data: ordersData, isLoading: isLoadingOrder } = useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getAll,
  });

  const { data: statsData, isLoading: isLoadingStats } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: statsApi.getDashboard,
  });

  // TODO: try send the last first order from the backend to the frontend
  const recentOrders = ordersData?.orders.slice(0, 5) || [];
  const statsCards = [
    {
      label: "Total Revenue",
      value: isLoadingStats
        ? "..."
        : `$${statsData?.totalRevenue.toFixed(2) || 0}`,
      icon: <DollarSignIcon className="size-8" />,
    },
    {
      label: "Total Orders",
      value: isLoadingStats ? "..." : `$${statsData?.totalOrders || 0}`,
      icon: <ShoppingBagIcon className="size-8" />,
    },
    {
      label: "Total Customers",
      value: isLoadingStats ? "..." : `$${statsData?.totalCustomers || 0}`,
      icon: <UsersIcon className="size-8" />,
    },
    {
      label: "Total Products",
      value: isLoadingStats ? "..." : `$${statsData?.totalProducts || 0}`,
      icon: <PackageIcon className="size-8" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* STATS */}
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-100">
        {statsCards.map((card) => {
          return (
            <div key={card.label} className="stat">
              <div className="stat-figure text-primary">{card.icon}</div>
              <div className="stat-title">{card.label}</div>
              <div className="stat-value">{card.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
