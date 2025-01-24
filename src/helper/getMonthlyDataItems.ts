import { Item } from "../model/item";

const getMonthlyDataItems = (items: Item[]) => {
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

export default getMonthlyDataItems;