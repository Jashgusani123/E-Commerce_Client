import { ReactElement, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../Components/admin/TableHOC";
import { Skeleton } from "../Components/Loader";
import { useMyOrdersQuery } from "../Redux/api/OrderAPI";
import { customError } from "../Types/api";
import { UserReducerInitialState } from "../Types/reducer";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
};

const columns: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const Orders = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { isLoading, data, error, isError } = useMyOrdersQuery(user?._id!);

  const [Rows, setrows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as customError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setrows(
        data?.Orders.map((i) => ({
          _id: i._id,
          amount: i.totalAmount,
          quantity: i.orderItems.length,
          discount: i.discount,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    Rows,
    "dashboard-product-box",
    "Orders",
    Rows.length > 6
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      <main>{isLoading ? <Skeleton count={21} /> : Table}</main>
    </div>
  );
};

export default Orders;
