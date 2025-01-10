import { useState } from "react";
import toast from "react-hot-toast";
import { Skeleton } from "../Components/Loader";
import {
  useCategoriesProductsQuery,
  useSearchProductsQuery,
} from "../Redux/api/ProductsAPI";
import { customError } from "../Types/api";
import Product_Card from "../Components/Product_Card";
import { useDispatch } from "react-redux";
import { CartItem } from "../Types/types";
import { addToCart } from "../Redux/reducer/cartReducer";

const Search = ({ isRange }: { isRange: number }) => {
  const {
    data: categoriesResponse,
    isLoading: loadingCategory,
    isError,
    error,
  } = useCategoriesProductsQuery("");
  const dispatch = useDispatch();
  // Use a safe fallback for price until the data is loaded
  const [price, setPrice] = useState<number>(100000);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  const {
    data: searchedData,
    isLoading: searchLoading,
    isError: isSearchError,
    error: searchError,
  } = useSearchProductsQuery({ search, price, page, category, sort });

  const IsNextPage = page < 4;
  const IsPreviousPage = page > 1;

  if (isError) {
    const err = error as customError;
    toast.error(err.data.message);
  }

  if (isSearchError) {
    const err = searchError as customError;
    toast.error(err.data.message);
  }

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out Of Stock !!");
    dispatch(addToCart(cartItem));
    toast.success("Item Added In Cart !!");
  };

  return (
    <div className="product-search">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price ( Low to High )</option>
            <option value="desc">Price ( High to Low )</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {price || ""}</h4>
          <input
            type="range"
            min="100"
            max={isRange ? isRange : 100000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {!loadingCategory &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {searchLoading ? (
          <Skeleton count={21}/>
        ) : (
          <div className="searchProductList">
            {!searchLoading &&
              searchedData?.products.map((i) => (
                <Product_Card
                  key={i._id}
                  productId={i._id}
                  photo={i.photo}
                  name={i.name}
                  price={i.price!}
                  stock={i.stock}
                  handler={addToCartHandler}
                />
              ))}
          </div>
        )}
        {searchedData && searchedData.totalPage > 1 && (
          <article>
            <button
              onClick={() => setPage(page - 1)}
              disabled={!IsPreviousPage}
            >
              Previous
            </button>
            <span>
              {page} of {searchedData.totalPage}
            </span>
            <button onClick={() => setPage(page + 1)} disabled={!IsNextPage}>
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
