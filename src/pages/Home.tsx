import { useEffect, useState } from "react";
import ApexChart from "../components/ApexChart";
import useFetch from "../hooks/useFetch";
import { Item } from "../model/item";
import { Order } from "../model/order";
import getMonthlyDataItems from "../helper/getMonthlyDataItems";
import getMonthlyDataForOrders from "../helper/getMonthlyDataOrders";

const Home: React.FC = () => {
  const [expensesData, setExpenses] = useState<number[]>([]);
  const [revenueData, setRevenue] = useState<number[]>([]);
  const {
    data: ordersData,
    error: ordersError,
    loading: ordersLoading,
  } = useFetch<Order[]>("order");
  const {
    data: itemsData,
    error: itemsError,
    loading: itemsLoading,
  } = useFetch<Item[]>("item");

  useEffect(() => {
    if (ordersData) {
      setRevenue(getMonthlyDataForOrders(ordersData));
    }
  }, [ordersData]);

  useEffect(() => {
    if (itemsData) {
      setExpenses(getMonthlyDataItems(itemsData));
    }
  }, [itemsData]);

  if (ordersLoading && itemsLoading) return <p>Loading...</p>;
  if (ordersError || itemsError)
    return <p>Error fetching orders: {ordersError}</p>;

  return (
    <>
      <ApexChart
        title="Entrate e Uscite"
        expensesData={expensesData}
        revenueData={revenueData}
      />
    </>
  );
};

export default Home;
