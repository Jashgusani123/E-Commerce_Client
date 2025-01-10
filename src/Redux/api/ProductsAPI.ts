import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoriesResponse,
  DeleteProductRequest,
  MessageResponse,
  NewProductRequest,
  ProductDetailResponse,
  ProductResponse,
  rangeResponse,
  SearchProductsRequest,
  SearchProductsResponse,
  UpdateProductRequest,
} from "../../Types/api";

export const ProductAPI = createApi({
  reducerPath: "ProductAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["Product"],
  endpoints: (builders) => ({
    latestProducts: builders.query<ProductResponse, string>({
      query: () => "latest",
      providesTags: ["Product"],
    }),
    AllProducts: builders.query<ProductResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["Product"],
    }),
    CategoriesProducts: builders.query<CategoriesResponse, string>({
      query: () => `categories`,
      providesTags: ["Product"],
    }),
    rangeProducts: builders.query<rangeResponse, string>({
      query: () => `range`,
      providesTags: ["Product"],
    }),
    SearchProducts: builders.query<
      SearchProductsResponse,
      SearchProductsRequest >({
      query: ({ price, search, sort, category, page }) => {
        let baseQuery = `search?search=${search}`;
        if (page) {
          baseQuery += `&page=${page}`;
        }
        if (price) {
          baseQuery += `&price=${price}`;
        }
        if (sort) {
          baseQuery += `&sort=${sort}`;
        }
        if (category) {
          baseQuery += `&category=${category}`;
        }
        return baseQuery;
      },
      providesTags: ["Product"],
    }),
    getProductDetails: builders.query<ProductDetailResponse, string>({
      query: (id) => `${id}`,
      providesTags: ["Product"],
    }),
    newProduct: builders.mutation<MessageResponse, NewProductRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builders.mutation<MessageResponse, UpdateProductRequest>({
      query: ({ formData, userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    DeleteProduct: builders.mutation<MessageResponse, DeleteProductRequest>({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    })
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesProductsQuery,
  useSearchProductsQuery,
  useRangeProductsQuery,
  useNewProductMutation,
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useDeleteProductMutation ,
} = ProductAPI;
