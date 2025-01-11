import { Item } from './item';

export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  items: Item[];
}
