import { Bar, CartItem, Line, OrderType, Pie, Product, ShippingInfo, Stats, User } from "./types";

export type customError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type AllUsersRespones = {
  success:boolean,
  users:User[]
};

export type DeleteUserRequest = {
  userId:string,
  adminUserId:string
}

export type ProductResponse = {
  success: boolean;
  products: Product[];
};
export type CategoriesResponse = {
  success: boolean;
  categories: string[];
};

export type SearchProductsResponse = {
  success: boolean;
  products: [
    {
      name: string;
      category: string;
      price: number | undefined;
      stock: number;
      photo: string;
      _id: string;
    }
  ];
  totalPage: number;
};

export type SearchProductsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};

export type rangeResponse = {
  success: boolean;
  products: {
    name: string;
    category: string;
    price: number | undefined;
    stock: number;
    photo: string;
    _id: string;
  } | null;
};
export type ProductDetailResponse = {
  success: boolean;
  product: Product;
};
export type NewProductRequest = {
  id: string;
  formData: FormData;
};
export type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};
export type DeleteProductRequest = {
  userId: string;
  productId: string;
};

export type NewOrderRequest = {
  orderItems : CartItem[],
  subTotal:number,
  tax:number,
  shippingCharges:number,
  discount:number,
  totalAmount:number,
  shippingInfo:ShippingInfo,
  user:string;
};
export type AllOrdersRespones = {
  success:boolean,
  Orders:OrderType[];
}
export type OrderDetailsRespones = {
  success:boolean,
  Orders:OrderType;
}
export type UpdateOrderRequest = {
  userId:string,
  orderId:string
};


export type StatsRespones = {
  success:boolean,
  stats:Stats;
}
export type PieRespones = {
  success:boolean,
  pieChart:Pie 
}
export type BarRespones = {
  success:boolean,
  barChart:Bar 
}
export type LineRespones = {
  success:boolean,
  lineChart:Line 
}