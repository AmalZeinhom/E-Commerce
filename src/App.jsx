import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Categories from "./Pages/Categories.jsx";
import Brands from "./Pages/Brands.jsx";
import Products from "./Pages/Products.jsx";
import Layout from "./Components/Layout.jsx";
import Login from "./Pages/LogIn.jsx";
import Orders from "./Pages/Orders.jsx";
import NotFound from "./Pages/NotFound.jsx";
import SubCategory from "../src/SubPages/SubCategory.jsx";
import SubBrands from "../src/SubPages/SubBrands.jsx";
import SignUp from "./Pages/SignUp.jsx";
import { Toaster } from "react-hot-toast";
import Forgetpassword from "./SubPages/Forgetpassword.jsx";
import ResetPassword from "./SubPages/ResetPAssword.jsx";
import VerifyOTP from "./SubPages/VerifyOTP.jsx";
import Cart from "./Pages/Cart.jsx";
import ProtectedRoutes from "./Protected/ProtectedRoutes.jsx";
import ProductDetails from "./SubPages/ProductDetails.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import AuthContextProvider from "./Context/AuthContext.jsx";
import LoginProtected from "./Protected/LoginProtected.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import WishListContextProvider from "./Context/WishListContext.jsx";

export default function App() {
  // Routing
  let routes = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
          children: [{ path: "subCategory", element: <SubCategory /> }],
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
          children: [{ path: "subBrands", element: <SubBrands /> }],
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/orders",
          element: (
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/login",
          element: (
            <LoginProtected>
              <Login />
            </LoginProtected>
          ),
        },
        {
          path: "/signUp",
          element: (
            <LoginProtected>
              <SignUp />
            </LoginProtected>
          ),
        },
        { path: "*", element: <NotFound /> },
        { path: "forgotPassword", element: <Forgetpassword /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "verify", element: <VerifyOTP /> },
      ],
    },
  ]);

  return (
    <AuthContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
          <div>
            <RouterProvider router={routes} />;
            <Toaster />
          </div>
        </WishListContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}
