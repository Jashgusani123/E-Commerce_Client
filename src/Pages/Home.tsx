import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Skeleton } from "../Components/Loader";
import Product_Card from "../Components/Product_Card";
import { useLatestProductsQuery } from "../Redux/api/ProductsAPI";
import { CartItem } from "../Types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/reducer/cartReducer";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const dispatch = useDispatch();
  
  if (isError) toast.error("Connot Fetch the Products");

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out Of Stock !!");
    dispatch(addToCart(cartItem));
    toast.success("Item Added In Cart !!")
  };
  return (
    <div className="home">
      <section></section>
      <h4>
        Latest Products
        <Link to="/search" className="findmore">
          Find More
        </Link>
      </h4>

      <main>
        {isLoading ? (
          <Skeleton width="100vw" />
        ) : (
          data?.products?.map((i) => (
            <Product_Card
              key={i._id}
              productId={i._id}
              photo={i.photo}
              name={i.name}
              price={i.price!}
              stock={i.stock}
              handler={addToCartHandler}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
