// src/Context/CartContextProvider.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { CartContext } from "./CartContextSeperate.jsx";
import { AuthContext } from "./AuthContextSeperate.jsx";

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastOrder, setLastOrder] = useState(null);

  async function getLoggedUserCart() {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: token,
          },
        }
      );
      setCart(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function addProductsToCart(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }
    const loadingToast = toast.loading("Loading..", {
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: { token: token },
        }
      );
      setCart(data);
      toast.success("Product has been successfully added");
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  async function removeProductFromCart(cartItemId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }
    const loadingToast = toast.loading("Loading..", {
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
        {
          headers: { token: token },
        }
      );
      setCart(data);
      toast.success("Product has been successfully deleted");
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  async function clearCart() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }
    const loadingToast = toast.loading("Loading..", {
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });
    try {
      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token: token },
        }
      );
      setCart(data);
      toast.success("The entire cart has been cleared");
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
    <CartContext.Provider
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
    </CartContext.Provider>
  );
}
