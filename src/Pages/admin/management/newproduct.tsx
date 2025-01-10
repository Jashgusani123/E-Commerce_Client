import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../../Components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../Types/reducer";
import { useNewProductMutation } from "../../../Redux/api/ProductsAPI";
import { responesToast } from "../../../Utils/Feature";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader";

const NewProduct = () => {
  const { user  } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();

  const [createProduct ,{isLoading}] = useNewProductMutation();
  const navigate = useNavigate()
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };
  const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!name ||!category|| !stock || !photo || !price) return ;

    const formData  = new FormData;
    formData.set("name" , name)
    formData.set("price" , price.toString())
    formData.set("category" , category)
    formData.set("stock" , stock.toString())
    formData.set("photo" ,photo)

    const res = await createProduct({id:user?._id! , formData})
   responesToast(res , navigate , "/admin/product" )
  };
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input required type="file" onChange={changeImageHandler} />
            </div>

            {photoPrev && <img src={photoPrev} alt="New Image" />}
            <button type="submit">
              {isLoading ? <Loader /> : "Create"}
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
