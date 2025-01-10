import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BarRespones, LineRespones, PieRespones, StatsRespones } from "../../Types/api";

export const DashboardAPI = createApi({
  reducerPath: "DashboardAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/admin/dashboard/`,
  }),
  tagTypes: [],
  endpoints: (builder) => ({
  
    stats:builder.query<StatsRespones, string>({
        query:((id)=>`stats?id=${id}`)
    }),
    pie:builder.query<PieRespones, string>({
        query:((id)=>`pie?id=${id}`)
    }),
    bar:builder.query<BarRespones, string>({
        query:((id)=>`bar?id=${id}`)
    }),
    line:builder.query<LineRespones, string>({
        query:((id)=>`line?id=${id}`)
    })
})
});

export const {useStatsQuery , usePieQuery , useBarQuery , useLineQuery} = DashboardAPI;
