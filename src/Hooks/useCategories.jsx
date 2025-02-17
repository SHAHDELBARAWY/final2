import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function useCategories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let response = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: Infinity, 
    cacheTime: Infinity, 
  });
  return response;
}