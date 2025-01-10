import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../Components/admin/AdminSidebar";
import TableHOC from "../../Components/admin/TableHOC";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../Types/reducer";
import { useAllOrdersQuery } from "../../Redux/api/OrderAPI";
import { customError } from "../../Types/api";
import toast from "react-hot-toast";
import { Skeleton } from "../../Components/Loader";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}


const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transaction = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { isLoading, data, error, isError } = useAllOrdersQuery(user?._id!);

  const [rows, setrows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as customError;
    toast.error(err.data.message);
  }
  
  useEffect(() => {
    if (data) {
      setrows(
        data?.Orders?.map((i) => ({
          user: i.user.name,
          amount: i.totalAmount,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red": i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6
  )();
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading?<Skeleton count={21}/>:Table}</main>
    </div>
  );
};

export default Transaction;
