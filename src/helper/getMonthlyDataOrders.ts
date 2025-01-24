import { Order } from "../model/order";

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
export default getMonthlyDataForOrders;
