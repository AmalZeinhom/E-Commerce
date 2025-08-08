import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import React from "react";

export let cartContext = createContext(null);
export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const[lastOrder, setLastOrder] = useState(null)

  async function getLoggedUserCart() {
    setLoading(true);
    // setDisableBtn(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCart(data);
    } catch (error) {
      console.log(error);
    } finally {
        // setDisableBtn(false);
      setLoading(false);
      
    }
  }

  async function addProductsToCart(productId) {
    const loadingToast = toast.loading("Loading..", {
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log(data);
      toast.success("Product has been Successfuly Added");
      setCart(data);
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  async function removeProductFromCart(cartItemId) {
    const loadingToast = toast.loading("Loading..", {
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log(data);
      toast.success("Product has been Successfully Deleted");
      setCart(data);
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  async function clearCart() {
    const loadingToast = toast.loading("Loading..", {
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success("The Entire Content has been Deleted");
      setCart(data);
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        cart,
        loading,
        lastOrder,
        setLastOrder,
        addProductsToCart,
        getLoggedUserCart,
        removeProductFromCart,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
