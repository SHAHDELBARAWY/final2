import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
export default function useProducts(){

    function getRecent ()
    {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }

    let responseObject =
     useQuery({
        queryKey:['recentProducts'],
        queryFn:getRecent,
        //refetchIntervalInBackground:true,
        //refetchInterval:3000,


        staleTime:80000,
       // retry:6,
       // retryDelay:1
       //gcTime:4000
    })


    return(
       responseObject
    )
}