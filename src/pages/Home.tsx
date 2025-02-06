import { useEffect, useState } from "react";
import ApexChart from "../components/ApexChart";
import useFetch from "../hooks/useFetch";
import { Item } from "../model/item";
import { Order } from "../model/order";
import getMonthlyDataItems from "../helper/getMonthlyDataItems";
import getMonthlyDataForOrders from "../helper/getMonthlyDataOrders";
import { Costumers } from "../model/costumers";

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
  const {
    data: costumersData,
    error: costumersError,
    loading: costumersLoading,
  } = useFetch<Costumers[]>("costumers");

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

  if (ordersLoading && itemsLoading && costumersLoading)
    return <p>Loading...</p>;

  if (ordersError || itemsError || costumersError)
    return <p>Error fetching data</p>;

  return (
    <>
      <div>Clienti: {costumersData?.length}</div>
      <div>Ordini: {ordersData?.length}</div>
      <div>Entrate: {revenueData}€ </div>
      <div>Uscite: {expensesData}€</div>
      <ApexChart
        title="Entrate e Uscite"
        expensesData={expensesData}
        revenueData={revenueData}
      />
    </>
  );
};

export default Home;
