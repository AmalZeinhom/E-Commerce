import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let wishListContext = createContext(null)

import React from 'react'
import toast from "react-hot-toast";

export default function WishListContextProvider({children}) {
    const [wishList, setWishList] = useState(null)
   
    async function getLoggedUserWishlist() {
        try {
            let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            setWishList(data);
            console.log(data);

        } catch (error) {
            console.log(error);            
        }        
    }

    async function addProductToWishList(productId) {
        const loadingToast = toast.loading("Loading..", {
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });
        try {
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
                productId
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            toast.success("Product Successfully Added")
            setWishList(data);
            
        } catch (error) {
            console.log(error);            
        }finally{
            toast.dismiss(loadingToast)
        }
    }

    async function removeItemFromWishList(wishListItemID) {
        const loadingToast = toast.loading("Loading..", {
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${wishListItemID}`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            toast.success("Product has been Successfully Deleted")
            setWishList(data);
            
        } catch (error) {
            console.log(error);            
        }finally{
            toast.dismiss(loadingToast)
        }
    }
    useEffect( () => {
        getLoggedUserWishlist();
    },[])

  return (
    <wishListContext.Provider value={{wishList, addProductToWishList, getLoggedUserWishlist, removeItemFromWishList }}>
        {children}
    </wishListContext.Provider>
  )
}
