import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../Types/api"
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

type ResType ={
    data:MessageResponse;
}|{
        error:FetchBaseQueryError | SerializedError
}

export const responesToast = (res:ResType , navigate:NavigateFunction | null , url:string)=>{
    if("data" in res){
        toast.success(res.data.message);
        if(navigate){
            navigate(url)
        }
    }else{
        const err = res.error as FetchBaseQueryError;
        const messageResponse = err.data as MessageResponse;
        toast.error(messageResponse.message)   
    }
}


export const getLastMonths = () => {
    const currentDate = moment(); // Start from the 1st of the current month
    const last6Month: string[] = [];
    const last12Month: string[] = [];

    // Last 6 Months
    for (let i = 0; i < 6; i++) {
        const monthDate = currentDate.clone().subtract(i, "months");
        const monthName = monthDate.format("MMMM");
        last6Month.unshift(monthName); // Add month to the array
    }

    // Last 12 Months
    for (let i = 0; i < 12; i++) {
        const monthDate = currentDate.clone().subtract(i, "months");
        const monthName = monthDate.format("MMMM");
        last12Month.unshift(monthName); // Add month to the array
    }

    return {
        last6Month,
        last12Month,
    };
};
