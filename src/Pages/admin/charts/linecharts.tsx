import { useSelector } from "react-redux";
import AdminSidebar from "../../../Components/admin/AdminSidebar";
import { RootState } from "../../../Redux/store";
import { LineChart } from "../../../Components/admin/Charts";
import { toast } from "react-hot-toast";
import { useLineQuery } from "../../../Redux/api/DashboardAPI";
import { customError } from "../../../Types/api";
import { Skeleton } from "../../../Components/Loader";
import { getLastMonths } from "../../../Utils/Feature";

const {last12Month } = getLastMonths()

const Linecharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, error, isError } = useLineQuery(user?._id!);

  const lineChart = data?.lineChart;

  if (isError) {
    const err = error as customError;
    toast.error(err.data.message);
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        {isLoading ? (
          <Skeleton count={21}/>
        ) : (
          <>
            <section>
              <LineChart
                data={lineChart?.users!}
                label="Users"
                borderColor="rgb(53, 162, 255)"
                labels={last12Month}
                backgroundColor="rgba(53, 162, 255, 0.5)"
              />
              <h2>Active Users</h2>
            </section>

            <section>
              <LineChart
                data={lineChart?.products!}
                backgroundColor={"hsla(269,80%,40%,0.4)"}
                borderColor={"hsl(269,80%,40%)"}
                labels={last12Month}
                label="Products"
              />
              <h2>Total Products (SKU)</h2>
            </section>

            <section>
              <LineChart
                data={lineChart?.revenue!}
                backgroundColor={"hsla(129,80%,40%,0.4)"}
                borderColor={"hsl(129,80%,40%)"}
                label="Revenue"
                labels={last12Month}
              />
              <h2>Total Revenue </h2>
            </section>

            <section>
              <LineChart
                data={lineChart?.discount!}
                backgroundColor={"hsla(29,80%,40%,0.4)"}
                borderColor={"hsl(29,80%,40%)"}
                label="Discount"
                labels={last12Month}
              />
              <h2>Discount Allotted </h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Linecharts;
