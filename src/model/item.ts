import { Order } from './order';
import { Supplier } from './supplier';

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  supplier: Supplier;
  supplierId: number;
  createdAt: Date;
  updatedAt: Date;
  order?: Order;
  orderId?: number;
}
