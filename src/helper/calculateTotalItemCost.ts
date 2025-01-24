import { Order } from "../model/order";

const calculateTotalItemCost = (items: Order["items"]): number => {
  return items.reduce((sum, item) => sum + item.item.cost * item.quantity, 0);
};

export default calculateTotalItemCost;
