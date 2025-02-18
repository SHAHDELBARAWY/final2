import axios from "axios";
import { createContext, useEffect, useState } from "react";

import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider(props) {


    const headers = {
        token: localStorage.getItem('userToken')
    };

    const updateLocalStorage = (items) => {
        localStorage.setItem('cartcontext', JSON.stringify(items));
    };


    function getCartItems ()  {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers:headers })
        .then((response)=> response)
        .catch((error)=> error)
    }

    function removeCartItem (productId)
     {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers:headers })
        .then((response)=> response)
        .catch((x)=> x)
    } 
    
    function updateCartItem (productId , count)
    {
       return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
         { count:count}
       , { headers:headers })
       .then((response)=> response)
       .catch((x)=> x)
   }    


    //function addToCart (productId) 
   // {
        //return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: product.id }, { headers })
       // .then((response)=>response)

     //   .catch((error)=> error)
        
          //  toast.success('product added', {
               // position:'top-right',
             //   className:'bg-success text-white'
           // });

    //}    

    const addToCart= async (product) => {
        try {
            await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: product.id }, { headers });
            toast.success('product added',{
                position:'top-right',
                className:'bg-success text-white'

            })
        } catch (error) {
            console.log(error);
        }
    };
       



        
     

    const isInCartContext = (productId) => {
        return Array.isArray(getCartItems) && getCartItems.some((item) => item.id === productId);
    };

    useEffect(() => {
        const storedCart = localStorage.getItem('cartcontext');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            if (Array.isArray(parsedCart)) {
               setCartItems(parsedCart);
                
            }
        } else {
            getCartItems();
        }
    }, []);

    return (
        <CartContext.Provider value={{ getCartItems , addToCart, removeCartItem, updateCartItem, isInCartContext }}>
           { (props.children)}
        </CartContext.Provider>
    );
}