import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../Components/admin/AdminSidebar";
import TableHOC from "../../Components/admin/TableHOC";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../Types/reducer";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../Redux/api/UserAPI";
import { customError } from "../../Types/api";
import toast from "react-hot-toast";
import { Skeleton } from "../../Components/Loader";
import { responesToast } from "../../Utils/Feature";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const [rows, setRow] = useState<DataType[]>([]);

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const [deleteUser] = useDeleteUserMutation();
  const { isLoading, data, error, isError } = useAllUsersQuery(user?._id!);

  if (isError) {
    const err = error as customError;
    toast.error(err.data.message);
  }
  const deleteHandler = async(userId: string) => {
    const res = await deleteUser({ userId, adminUserId: user?._id !});
    responesToast(res , null , "")
  };
  useEffect(() => {
    if (data?.users) {
      setRow(
        data.users.map((i) => ({
          avatar: <img src={i.photo} />,
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <FaTrash />
            </button>
          ),
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton count={21} /> : Table}</main>
    </div>
  );
};

export default Customers;
