import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../Components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../Types/reducer";
import {
  useDeleteProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../Redux/api/ProductsAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "../../../Components/Loader";
import { responesToast } from "../../../Utils/Feature";

const Productmanagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const params = useParams();
  const navigate = useNavigate();
  const { data: ProductData, isLoading } = useGetProductDetailsQuery(
    params.id!
  );

  const { price, photo, name, stock, category, _id } = ProductData?.product || {
    _id: "",
    price: 0,
    photo: "",
    stock: 0,
    name: "",
    category: "",
  };
  const [priceUpdate, setPriceUpdate] = useState<number>(price!);
  const [stockUpdate, setStockUpdate] = useState<number>(stock!);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData();
    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);
    if (categoryUpdate) formData.set("category", categoryUpdate);

    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: ProductData?.product._id!,
    });

    responesToast(res, navigate, "/admin/product");
  };
  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: ProductData?.product._id!,
    });

    responesToast(res, navigate, "/admin/product");
  };
  useEffect(() => {
    if (ProductData?.product) {
      setNameUpdate(ProductData.product.name);
      setPriceUpdate(ProductData.product.price!);
      setStockUpdate(ProductData.product.stock);
      setCategoryUpdate(ProductData.product.category);
    }
  }, [ProductData]);

  return (
    <>
      <div className="admin-container">
        <AdminSidebar />
        <main className="product-management">
          {isLoading ? (
            <Skeleton count={21}/>
          ) : (
            <>
              <section>
                <strong>ID - {_id}</strong>
                <img src={photo} alt="Product" />
                <p>{name}</p>
                {stock > 0 ? (
                  <span className="green">{stock} Available</span>
                ) : (
                  <span className="red"> Not Available</span>
                )}
                <h3>₹{price}</h3>
              </section>
              <article>
                <button className="product-delete-btn" onClick={deleteHandler}>
                  <FaTrash />
                </button>
                <form onSubmit={submitHandler}>
                  <h2>Manage</h2>
                  <div>
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={nameUpdate}
                      onChange={(e) => setNameUpdate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Price</label>
                    <input
                      type="number"
                      placeholder="Price"
                      value={priceUpdate}
                      onChange={(e) => setPriceUpdate(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label>Stock</label>
                    <input
                      type="number"
                      placeholder="Stock"
                      value={stockUpdate}
                      onChange={(e) => setStockUpdate(Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <label>Category</label>
                    <input
                      type="text"
                      placeholder="eg. laptop, camera etc"
                      value={categoryUpdate}
                      onChange={(e) => setCategoryUpdate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Photo</label>
                    <input type="file" onChange={changeImageHandler} />
                  </div>

                  {photoUpdate && <img src={photoUpdate} alt="New Image" />}
                  <button type="submit">Update</button>
                </form>
              </article>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Productmanagement;
