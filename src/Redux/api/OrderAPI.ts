import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrdersRespones,
  MessageResponse,
  NewOrderRequest,
  OrderDetailsRespones,
  UpdateOrderRequest,
} from "../../Types/api";

export const OrderAPI = createApi({
  reducerPath: "OrderAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    NewOrder: builder.mutation<MessageResponse, NewOrderRequest>({
      query: (order) => ({ url: "new", method: "POST", body: order }),
      invalidatesTags: () => ["orders"],
    }),
    MyOrders: builder.query<AllOrdersRespones, string>({
      query: (id) => `my?id=${id}`,
      providesTags: ["orders"],
    }),
    AllOrders: builder.query<AllOrdersRespones, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["orders"],
    }),
    OrderDetails: builder.query<OrderDetailsRespones, string>({
      query: (id) => `${id}`,
      providesTags: ["orders"],
    }),
    UpdateOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: () => ["orders"],
    }),
    deleteOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => ["orders"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useMyOrdersQuery,
  useAllOrdersQuery,
  useOrderDetailsQuery,
} = OrderAPI;
