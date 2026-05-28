export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  category: 'coffee' | 'non-coffee';
  isSoldOut?: boolean;
}

export interface CartItem extends MenuItem {
  qty: number;
}

export interface Order {
  id: string;
  customerName: string;
  tableNumber: string;
  items: CartItem[];
  notes?: string;
  totalAmount: number;
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid';
  createdAt: string;
}
