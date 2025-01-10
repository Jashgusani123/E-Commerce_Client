import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../Components/admin/AdminSidebar";
import { Skeleton } from "../../../Components/Loader";
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from "../../../Redux/api/OrderAPI";
import { UserReducerInitialState } from "../../../Types/reducer";
import { OrderItem } from "../../../Types/types";
import { responesToast } from "../../../Utils/Feature";

const TransactionManagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const params = useParams();
  const navigate = useNavigate();
  const { isLoading, currentData , data, isError } = useOrderDetailsQuery(params.id!);

  const defaultOBJ = {
    shippingInfo: {
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: 0,
    },
    status: "",
    subTotal: 0,
    discount: 0,
    shippingCharges: 0,
    tax: 0,
    totalAmount: 0,
    orderItems: [],
    user: {
      name: "",
      _id: "",
    },
    _id: "",
  };
  const {
    shippingCharges,
    shippingInfo,
    user: { name },
    orderItems,
    status,
    subTotal,
    totalAmount,
    discount,
    tax,
  } = data?.Orders || defaultOBJ;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation()

  const updateHandler = async() => {
    const res = await updateOrder({
      userId:user?._id!,  
      orderId:data?.Orders._id!
    })
    responesToast(res , navigate , "/admin/transaction")
  };
  const deleteHandler = async() => {
    const res = await deleteOrder({
      userId:user?._id!,
      orderId:data?.Orders._id!
    })
    responesToast(res , navigate , "/admin/transaction")
  };
  if (isError) {
    return <Navigate to={"/404"} />;
  }
  
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton count={21}/>
        ) : (
          <>
            <section
              style={{
                padding: "2rem",
              }}
            >
              <h2>Order Items</h2>

              {orderItems.map((i) => (
                <ProductCard
                  key={i._id}
                  name={i.name}
                  photo={`${i.photo}`}
                  productId={i.productId}
                  _id={i._id}
                  quantity={i.quantity}
                  price={i.price}
                />
              ))}
            </section>

            <article className="shipping-info-card">
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <h1>Order Info</h1>
              <h5>User Info</h5>
              <p>Name: {name}</p>
              <p>
                Address:{" "}
                {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country} ${shippingInfo.pinCode}`}
              </p>
              <h5>Amount Info</h5>
              <p>Subtotal: {subTotal}</p>
              <p>Shipping Charges: {shippingCharges}</p>
              <p>Tax: {tax}</p>
              <p>Discount: {discount}</p>
              <p>Total: {totalAmount}</p>

              <h5>Status Info</h5>
              <p>
                Status:{" "}
                <span
                  className={
                    status === "Delivered"
                      ? "purple"
                      : status === "Shipped"
                      ? "green"
                      : "red"
                  }
                >
                  {status}
                </span>
              </p>
              <button className="shipping-btn" onClick={updateHandler}>
                Process Status
              </button>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: OrderItem) => (
  <div className="transaction-product-card">
    <img src={photo} alt={name} />
    <Link to={`/product/${productId}`}>{name}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
