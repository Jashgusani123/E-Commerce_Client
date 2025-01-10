import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { CartItem as CartItemType } from "../Types/types";

type CartItemProps = {
  cartItem: CartItemType;
  incrementHandler: (cartItem: CartItemType) => void;
  decrementHandler: (cartItem: CartItemType) => void;
  removeHandler: (id: string) => void;
}
const CartItem = ({cartItem , incrementHandler , decrementHandler , removeHandler}:CartItemProps) => {
  const {name , photo , price , quantity , productId} = cartItem;
  return (
    <div className="cart_item">
      <img src={photo} alt={name} />
        <article>
          <Link to={`/product/${productId}`}>{name}</Link>
          <span>₹ {price}</span>
        </article>
        <div>
          <button onClick={()=>decrementHandler(cartItem)}>-</button>
          <span>{quantity}</span>
          <button onClick={()=>incrementHandler(cartItem)}>+</button>
        </div>
        <button onClick={()=>removeHandler(productId)}><FaTrashAlt /></button>
    </div>
  )
}

export default CartItem
