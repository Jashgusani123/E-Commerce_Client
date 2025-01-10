import { ReactElement } from "react";

export interface User {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
}
export interface Product {
  name: string;
  category: string;
  price: number | undefined;
  stock: number;
  photo: string;
  _id: string;
}
export interface HeaderPropsType {
  user: User | null;
}

export interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children?: ReactElement;
  adminOnly?: boolean;
  admin?: boolean;
  redirect?: string;
}
export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
};
export type CartItem = {
  photo: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  stock: number;
};
export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type OrderType = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  tax: number;
  subTotal: number;
  shippingCharges: number;
  discount: number;
  totalAmount: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};

type Latest = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type Stats = {
  Percentage: {
    user: number;
    product: number;
    order: number;
    revenue: number;
  };
  count: {
    revenue: number;
    user: number;
    product: number;
    order: number;
  };
  chart: {
    order: number[];
    revenue: number[];
  };
  categoryCount: Record<string, number>[];
  userRatio: {
    male: number;
    female: number;
  };
  ModifyLatestTransaction: Latest[];
};

export type Pie = {
  orderFullFillment: {
    processing: number;
    shipped: number;
    delivered: number;
  };

  ProductCategory: Record<string, number>[];
  
  stockAvailablity: {
    inStock: number;
    outOfStock: number;
  };
  
  revenueDistribution: {
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
  };
  
  userAgesGroup: {
    teen: number;
    adult: number;
    old: number;
  };
  
  adminCoustmoers: {
    admin: number;
    coustmoers: number;
  };
};
export type Bar = {
  users:number[],
  products:number[],
  orders:number[],
};
export type Line = {
  users: number[],
  products: number[],
  discount: number[],
  revenue: number[]
}