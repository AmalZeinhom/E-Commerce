import axios from "axios";
import { useEffect, useState, useContext } from "react";
import React from "react";
import toast from "react-hot-toast";
import { WishListContext } from "./WighListContextSeperate.jsx";
import { AuthContext } from "./AuthContextSeperate.jsx";

export default function WishListContextProvider({ children }) {
  const [wishList, setWishList] = useState(null);
  const { token } = useContext(AuthContext);

  async function getLoggedUserWishlist() {
    if (!token) {
      setWishList(null);
      return;
    }
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: token,
          },
        }
      );
      setWishList(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addProductToWishList(productId) {
    if (!token) {
      toast.error("Please login to add favorites");
      return;
    }
    const loadingToast = toast.loading("Loading..", {
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      toast.success("Product Successfully Added");
      setWishList(data);
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  async function removeItemFromWishList(wishListItemID) {
    if (!token) {
      toast.error("Please login first");
      return;
    }
    const loadingToast = toast.loading("Loading..", {
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${wishListItemID}`,
        {
          headers: {
            token: token,
          },
        }
      );
      toast.success("Product has been Successfully Deleted");
      setWishList(data);
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        wishList,
        addProductToWishList,
        getLoggedUserWishlist,
        removeItemFromWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
