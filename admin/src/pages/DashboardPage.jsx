import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { orderApi, statsApi } from '../lib/api'

const DashboardPage = () => {

  const { data: ordersData, isLoading: isLoadingOrder } = useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getAll,
  });

  const { data: statsData, isLoading: isLoadingStats } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: statsApi.getDashboard,
  });

  console.log('====================================');
  console.log("Orders: ", ordersData);
  console.log('isLoading: ', isLoadingOrder);
  console.log('====================================');

  console.log("====================================");
  console.log("Stats: ", statsData);
  console.log("isLoading: ", isLoadingStats);
  console.log("====================================");

  return (
    <div>
      Dashboard Page
    </div>
  )
}

export default DashboardPage
