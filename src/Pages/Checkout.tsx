import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../Redux/api/OrderAPI";
import { resetCart } from "../Redux/reducer/cartReducer";
import { RootState, server } from "../Redux/store";
import { NewOrderRequest } from "../Types/api";
import { responesToast } from "../Utils/Feature";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useSelector(
    (state:RootState) => state.userReducer
  );
  const {
    discount,
    shippingCharges,
    shippingInfo,
    subTotal,
    tax,
    cartItems,
    total,
    couponCode
  } = useSelector(
    (state:RootState) => state.cartReducer
  );
  const [isProcessing, setisProcessing] = useState<boolean>(false);
  const [newOrder] = useNewOrderMutation()
  const deleteCoupon = (code:string)=>{
     axios.delete(`${server}/api/v1/payment/coupon/${code}?id=${user?._id!}`)
  }
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setisProcessing(true);
    const order:NewOrderRequest = {
        discount,
        shippingCharges,
        shippingInfo,
        subTotal,
        tax,
        orderItems:cartItems,
        totalAmount:total,
        user:user?._id!
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setisProcessing(false);
      return toast.error("Your Data Is incorrect");
    }
    if (paymentIntent.status === "succeeded") {
      const res = await newOrder(order)
      deleteCoupon(couponCode)
        dispatch(resetCart());
        responesToast(res , navigate , "/orders")
    }
    setisProcessing(false);
  };
  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
        <PaymentElement />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

const Checkout = () => {
  const location = useLocation();
  const clientSecret: string | undefined = location.state;
  if (!clientSecret) {
    return <Navigate to={"/shipping"} />;
  }
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckOutForm />
    </Elements>
  );
};

export default Checkout;
