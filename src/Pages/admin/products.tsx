import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../Components/admin/AdminSidebar";
import TableHOC from "../../Components/admin/TableHOC";
import { useAllProductsQuery } from "../../Redux/api/ProductsAPI";
import { customError } from "../../Types/api";
import { UserReducerInitialState } from "../../Types/reducer";
import { Skeleton } from "../../Components/Loader";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];



const Products = () => {

  const {user} = useSelector((state:{userReducer:UserReducerInitialState})=>state.userReducer)

  const {data , isError  , error , isLoading} = useAllProductsQuery(user?._id!)
  
  const [rows , setrows] = useState<DataType[]>([]);
  if(isError){
    const err = error as customError;
    toast.error(err.data.message)
  }

  useEffect(()=>{
    if(data){
      setrows(data?.products.map((i) => ({
        photo: <img src={i.photo} alt={i.name} />,
        name: i.name,
        price: i.price || 0,
        stock: i.stock,
        action: <Link to={`/admin/product/${i._id}`}>Manage</Link>
      })))
    }
  },[data])
  

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading?<Skeleton count={21}/>:Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
