import { configureStore } from '@reduxjs/toolkit'
import { ProductAPI } from '../Redux/api/ProductsAPI'
import { UserAPI } from '../Redux/api/UserAPI'
import { userReducer } from '../Redux/reducer/userReducer'
import { cartReducer } from '../Redux/reducer/cartReducer'
import { OrderAPI } from '../Redux/api/OrderAPI'
import { DashboardAPI } from './api/DashboardAPI'

export const server = import.meta.env.VITE_SERVER

export const store = configureStore({
    reducer:{
        [UserAPI.reducerPath]:UserAPI.reducer,
        [ProductAPI.reducerPath]:ProductAPI.reducer,
        [OrderAPI.reducerPath]:OrderAPI.reducer,
        [DashboardAPI.reducerPath]:DashboardAPI.reducer,
        [userReducer.name]:userReducer.reducer,
        [cartReducer.name]:cartReducer.reducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware()
            .concat(UserAPI.middleware)
            .concat(ProductAPI.middleware)
            .concat(OrderAPI.middleware)
            .concat(DashboardAPI.middleware)
}) 

export type RootState = ReturnType<typeof store.getState>