import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useBrands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let response = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: Infinity, 
    cacheTime: Infinity, 
  });
  return response;
}