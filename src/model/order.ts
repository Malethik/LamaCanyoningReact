import { Costumers } from './costumers';
import { Item } from './item';

export interface Order {
  id: number;
  total: number;
  item: Item[];
  costumers: Costumers;
  createdAt: Date;
  updatedAt: Date;
}
