import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { UserReducerInitialState } from '../../Types/reducer'
import { User } from '../../Types/types'

const initialState:UserReducerInitialState = {
    user:null,
    loading:true
}

export const userReducer = createSlice({
    name:"userReducer",
    initialState,
    reducers:{
        userExits: (state , action:PayloadAction<User>)=>{
            state.loading = false
            state.user = action.payload
        },
        userNotExits: (state)=>{
            state.loading = false
            state.user = null
        },

    } 
})


export const {userExits , userNotExits} = userReducer.actions