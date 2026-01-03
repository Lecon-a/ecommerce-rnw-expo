import React from "react";
import { useQuery } from "@tanstack/react-query";
import { orderApi, statsApi } from "../lib/api";
import {
  getOrderStatusBadge,
  capitalizeText,
  formatDate
} from "../lib/utils";
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
  const recentOrders = ordersData?.orders?.slice(0, 5) || [];
  const statsCards = [
    {
      label: "Total Revenue",
      value: isLoadingStats
        ? "..."
        : `$${statsData?.totalRevenue?.toFixed(2) || 0}`,
      icon: <DollarSignIcon className="size-8" />,
    },
    {
      label: "Total Orders",
      value: isLoadingStats ? "..." : `${statsData?.totalOrders || 0}`,
      icon: <ShoppingBagIcon className="size-8" />,
    },
    {
      label: "Total Customers",
      value: isLoadingStats ? "..." : `${statsData?.totalCustomers || 0}`,
      icon: <UsersIcon className="size-8" />,
    },
    {
      label: "Total Products",
      value: isLoadingStats ? "..." : `${statsData?.totalProducts || 0}`,
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

        {/* RECENT ORDERS */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title">Recent Orders</h1>
            {
              isLoadingOrder ? (
                <div className="justify-center flex py-8">
                  <span className="loading loading-spinner loading-lg" />
                </div>
              ) : recentOrders.length === 0 ? (
              <div className="text-center py-8">No orders yet.</div>
                ) : (
              <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        recentOrders.map(order => {
                          return <tr key={order._id}>
                            <td>
                              <span className="font-medium">#{ order._id.slice(-8).toUpperCase() }</span>
                            </td>
                            <td>
                              <div>
                                <div className="font-medium">{order.shippingAddress.fullName}</div>
                                <div className="text-sm opacity-60">
                                  { order.orderItems.length } item(s)
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="text-sm">
                                {order.orderItems[0]?.name}
                                {order.orderItems.length > 1 && ` +${order.orderItems.length - 1} more`}
                              </div>
                            </td>
                            <td>
                              <span className="font-semibold">${ order.totalPrice.toFixed(2) }</span>
                            </td>
                            <td>
                              <div className={`badge ${getOrderStatusBadge(order.status)}`}>{ capitalizeText(order.status) }</div>
                            </td>
                            <td>
                              <span className="text-sm opacity-60">{ formatDate(order.createdAt) }</span>
                            </td>
                          </tr>
                        })
                      }
                    </tbody>
                </table>
              </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
