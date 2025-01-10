import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { AllUsersRespones, DeleteUserRequest, MessageResponse, UserResponse } from "../../Types/api";
import { User } from "../../Types/types";

export const UserAPI = createApi({
  reducerPath: "UserAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/` }),
  tagTypes:["users"],
  endpoints: (builders) => ({
    login: builders.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "post",
        body: user,
      }),
      invalidatesTags:["users"]
    }),
    allUsers:builders.query<AllUsersRespones , string>({
      query:(id)=>`all?id=${id}`,
      providesTags:["users"]
    }),
    deleteUser:builders.mutation<MessageResponse,DeleteUserRequest>({
      query: ({userId , adminUserId}) => ({
        url: `${userId}?id=${adminUserId}`,
        method: "DELETE",
      }),
      invalidatesTags:["users"]
    })
  }),
});

export const getUser = async(id:string)=>{
  try {
    const {data}:{data:UserResponse} = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`)

    return data;
  } catch (error) {
    throw error
  }
}
export const { useLoginMutation , useAllUsersQuery , useDeleteUserMutation} = UserAPI;
