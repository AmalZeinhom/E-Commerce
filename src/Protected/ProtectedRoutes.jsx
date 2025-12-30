import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextSeperate.jsx";

export default function ProtectedRoutes({ children }) {

  let {token} = useContext(AuthContext);


  return (
    <div>
      {token ? children : <Navigate to={"/login"} />}
    </div>
  );
}
