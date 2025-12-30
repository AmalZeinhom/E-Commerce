import React, { useContext } from 'react'
import { AuthContext } from "../Context/AuthContextSeperate.jsx";
import { Navigate } from 'react-router-dom';

export default function LoginProtected({children}) {
    let { token } = useContext(AuthContext);
  return (
    <div>{!token ? children : <Navigate to={'/'}/>}</div>
  )
}
