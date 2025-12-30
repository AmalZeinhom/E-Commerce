import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContextSeperate";


export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(localStorage.getItem("token"));
  let [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  async function verifyToken() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (data?.decoded?.id) {
        localStorage.setItem("userId", data.decoded.id);
        setUserId(data.decoded.id);
        // console.log("Verified user ID:", data.decoded.id);
      }
    } catch (error) {
      console.log(error);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setUserId(null);
    }
  }

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, verifyToken, userId }}>
      {children}
    </AuthContext.Provider>
  );
}
