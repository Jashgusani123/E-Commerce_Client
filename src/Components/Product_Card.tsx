import { FaPlus } from "react-icons/fa";
import { CartItem } from "../Types/types";

type Product_Card_Props = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler:(cartItem: CartItem) => string | undefined;
}
const Product_Card = ({productId,photo,name,price,stock,handler}:Product_Card_Props) => {
  return (
    <div className="product_card">
        <img src={`${photo}`} alt={name} />
        <p>{name}</p>
        <span>₹ {price}</span>
        <div>
            <button onClick={()=>handler({
              productId,
              photo,
              name,
              price,
              stock,
              quantity:1
            })}><FaPlus /></button>
        </div>
    </div>
  )
}

export default Product_Card
