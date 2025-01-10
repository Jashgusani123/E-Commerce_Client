import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../Types/reducer";
import { CartItem, ShippingInfo } from "../../Types/types";

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subTotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: 0,
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      const idx = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );

      if (idx !== -1) {
        state.cartItems[idx] = action.payload;
      } else {
        state.cartItems.push(action.payload);
      }
      state.loading = false;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },
    calculatePrice: (state) => {
      let subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.subTotal = subtotal;
      state.shippingCharges = state.subTotal > 1000 ? 0 : 200;
      state.tax = Math.round(state.subTotal * 0.18);
      state.total =
        state.subTotal + state.tax + state.shippingCharges - state.discount;
    },
    applyDiscount : (state , action:PayloadAction<number>)=>{
      state.discount = action.payload ;
    },
    saveShippingInfo :(state , action:PayloadAction<ShippingInfo> )=>{
      state.shippingInfo = action.payload
    },
    resetCart:()=> initialState,
  },
});

export const { addToCart, removeCartItem, calculatePrice , applyDiscount , saveShippingInfo , resetCart } =
  cartReducer.actions;
