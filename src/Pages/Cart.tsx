import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../Components/CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../Types/reducer";
import {
  addToCart,
  applyDiscount,
  calculatePrice,
  removeCartItem,
} from "../Redux/reducer/cartReducer";
import { CartItem as cartItem } from "../Types/types";
import axios from "axios";
import { RootState, server } from "../Redux/store";

const Cart = () => {
  const {user} = useSelector((state:RootState)=>state.userReducer);
  const {
    cartItems: cartItem,
    subTotal: subTotal,
    tax,
    total,
    discount,
    shippingCharges,
  } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  const dispatch = useDispatch();

 

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();
    const id = setTimeout(() => {
      axios
        .get(
          `${
            import.meta.env.VITE_SERVER
          }/api/v1/payment/discount?code=${couponCode}`,
          { cancelToken: token }
        )
        .then((res) => {
          dispatch(applyDiscount({discount:res.data.discount,couponCode:couponCode}));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(applyDiscount({discount:0,couponCode:""}));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);
    return () => {
      clearTimeout(id);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);


  const incrementHandler = (cartItem: cartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: cartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItem]);
  return (
    <div className="cart">
      <main>
        {cartItem.length > 0 ? (
          cartItem.map((item, index) => {
            return (
              <CartItem
                key={index}
                cartItem={item}
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
                removeHandler={removeHandler}
              />
            );
          })
        ) : (
          <h1>No Items in Cart</h1>
        )}
      </main>
      <aside>
        <p>SubTotal : ₹ {subTotal}</p>
        <p>Shipping Charges : ₹ {shippingCharges}</p>
        <p>Tax : ₹ {tax}</p>
        <p>
          Discount : <em> - ₹ {discount}</em>
        </p>
        <p>
          <b>Total : ₹ {total}</b>
        </p>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter Coupon Code"
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              <div className="first_line">
                Discount : <em> - ₹ {discount}</em>
                {" "}off using the <code>{couponCode}</code>
              </div>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
        {cartItem.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
