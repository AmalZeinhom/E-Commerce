import React, { forwardRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import onlineOrder from "../assets/onlineOrder.png";
import cashOrder from "../assets/cashOrder.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cartContext } from "../Context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";


const Checkout = forwardRef((props, ref) => {
  const { totalPrice } = props;
  const phoneRegex = /^01[0125][0-9]{8}$/;
  const { cart, getLoggedUserCart, setLastOrder } = useContext(cartContext);
  const [pay, setPay] = useState('cash');
  let navigate = useNavigate();

  const validationSchema = Yup.object({
    details: Yup.string().required("This Field is Required"),
    phone: Yup.string()
      .required("Phone Number is Required")
      .matches(phoneRegex, "Phone Must be Eguption Number"),
    city: Yup.string()
      .required("City Name is Required")
      .min(2, "At Least 2 Letters"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (x) => {
      if(pay == 'cash'){
        payCash(x)
      }else{
        payOnline(x)
      }
    },
    validationSchema,
  });

  async function payOnline(values) {
    const loadingToast = toast.loading("Loading..", {
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if(data.status == "success"){
        window.location.href = data.session.url
      }
    }
     catch (error) {
      console.log(error);
    }finally{
      toast.dismiss(loadingToast)
    }
  }

  async function payCash(values) {
    const loadingToast = toast.loading("Loading..", {
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success("Redirecting you to your orders.")
      if(data.status == "success"){
         setLastOrder(cart);
       navigate('/orders');
       getLoggedUserCart()
      }
    }
     catch (error) {
      console.log(error);
    }finally{
      toast.dismiss(loadingToast)
    }
  }

  return (
    <div>
      <div
        className="d-flex justify-content-center position-relative mt-5"
        id="checkOut"
        ref={ref}
      >
        <h3 className="text-success checked-out">Check Out</h3>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="d-flex justify-content-center mx-auto flex-column mt-5 check-layout"
      >
        <h3
          className="fw-bold mb-3"
          style={{ color: "rgb(1, 133, 76)", fontSize: "14px" }}
        >
          SubTotal:{" "}
          <span style={{ color: "#00cc74", fontWeight: "400" }}>
            {" "}
            {totalPrice} EGP
          </span>
        </h3>
        <input
          type="text"
          className="form-control custom-input my-1"
          placeholder="Enter Your City Name"
          autoComplete="off"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.city && formik.touched.city && (
          <p className="text-danger my-1 msg">{formik.errors.city}</p>
        )}

        <div>
          <input
            type="tel"
            className="form-control custom-input my-1"
            placeholder="Enter Your Phone"
            autoComplete="off"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-danger my-1 msg">{formik.errors.phone}</p>
          )}
        </div>

        <div>
          <textarea
            className="custom-input form-control"
            style={{ width: "100%" }}
            placeholder="Details"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.details && formik.touched.details && (
            <p className="text-danger my-1 msg">{formik.errors.details}</p>
          )}
        </div>

        <div className="d-flex justify-content-center align-items-center gap-3">
          <button
            type="submit"
            onClick={() => {
              setPay('cash')
            }}
            className="animated-button  btn border-0 text-white rounded-2 mt-2 py-1 fw-medium w-50 d-flex justify-content-center align-items-center gap-2"
            style={{ backgroundColor: "#00cc74" }}
          >
            <img src={cashOrder} alt="Cash Order" style={{ height: "30px" }} />
            Cash Order
          </button>

          <button
            type="submit"
            onClick={() => {
              setPay('online')
            }}
            className="animated-button border-0  rounded-2 mt-2 py-1 fw-medium w-50 d-flex justify-content-center align-items-center gap-2 online-order"
          >
            <img
              src={onlineOrder}
              alt="Online Order"
              style={{ height: "30px" }}
            />
            Online Order
          </button>
        </div>
      </form>
    </div>
  );
});

export default Checkout;
