import { Costumers } from "./costumers";
import { Item } from "./item";

export interface Order {
  id: number;
  total: number;
  items: OrderItem[]; // Relazione intermedia con quantità e dettagli dell'oggetto
  sended?: boolean;
  costumers: Costumers; // Cliente associato
  costumersId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  quantity: number;
  item: Item; // Dettagli dell'oggetto associato
}
