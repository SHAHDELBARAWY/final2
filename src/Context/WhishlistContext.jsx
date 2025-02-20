import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WhishlistContext = createContext();

export default function WhishlistContextProvider({ children }) {
    const [WhishlistItems, setWhishlistItems] = useState([]);
    

    const headers = {
        token: localStorage.getItem('userToken')
    };

    const updateLocalStorage = (items) => {
        localStorage.setItem('Whishlistcontext', JSON.stringify(items));
    };

    const getWishlistContext = async () => {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
            console.log(response);
            setWhishlistItems(response.data?.data || []);
            updateLocalStorage(response.data?.data || []);
        } catch (error) {
            console.error("Error fetching wishlist:", error.response?.data || error.message);
        }
    };

    const addToWhishlistContext = async (product) => {
        try {
            await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: product.id }, { headers });
            const updatedList = [...WhishlistItems, product];
            setWhishlistItems(updatedList);
            updateLocalStorage(updatedList);
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromWhishlistContext = async (productId) => {
        try {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            const filteredProduct = WhishlistItems.filter((item) => item.id !== productId);
            setWhishlistItems(filteredProduct);
            updateLocalStorage(filteredProduct);
        } catch (error) {
            console.log(error);
        }
    };

    const isInWhishlistContext = (productId) => {
        return Array.isArray(WhishlistItems) && WhishlistItems.some((item) => item.id === productId);
    };

    useEffect(() => {
        const storedWhishlist = localStorage.getItem(' Whishlistcontext');
        if (storedWhishlist) {
            const parsedWhishlist = JSON.parse(storedWhishlist);
            if (Array.isArray(parsedWhishlist)) {
                setWhishlistItems(parsedWhishlist);
            }
        } else {
            getWishlistContext();
        }
    }, []);

    
    return (
        <WhishlistContext.Provider value={{ WhishlistItems, addToWhishlistContext, removeFromWhishlistContext, isInWhishlistContext }}>
            {children}
        </WhishlistContext.Provider>
    );
}