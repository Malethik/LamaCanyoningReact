import { Order } from "./order";
import { Supplier } from "./supplier";

export interface Item {
  id: number;
  name: string;
  cost: number;
  currency?: string;
  description: string;
  category?: string;
  tags?: string;
  price: number;
  quantity: number;
  lot?: string;
  supplier: Supplier;
  supplierId: number;
  createdAt: Date;
  updatedAt: Date;
  order?: Order;
  orderId?: number;
}
