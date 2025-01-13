import { useEffect, useState } from "react";
import ApexChart from "../components/ApexChart";
import useFetch from "../hooks/useFetch";
import { Item } from "../model/item";
import { Order } from "../model/order";

const getMonthlyData = (items: Item[]) => {
  const monthlyData: { [key: string]: number } = {};

  items.forEach((item) => {
    const month = new Date(item.createdAt).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (monthlyData[month]) {
      monthlyData[month] += item.price * item.quantity; // somma il prezzo * quantità
    } else {
      monthlyData[month] = item.price * item.quantity;
    }
  });

  return Object.entries(monthlyData)
    .sort(
      ([a], [b]) => new Date(`1 ${a}`).getTime() - new Date(`1 ${b}`).getTime()
    )
    .map(([, value]) => value);
};
const getMonthlyDataForOrders = (orders: Order[]) => {
  const monthlyData: { [key: string]: number } = {};

  orders.forEach((order) => {
    const month = new Date(order.createdAt).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (monthlyData[month]) {
      monthlyData[month] += order.total;
    } else {
      monthlyData[month] = order.total;
    }
  });

  return Object.entries(monthlyData)
    .sort(
      ([a], [b]) => new Date(`1 ${a}`).getTime() - new Date(`1 ${b}`).getTime()
    )
    .map(([, value]) => value);
};

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
      setExpenses(getMonthlyData(itemsData));
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
