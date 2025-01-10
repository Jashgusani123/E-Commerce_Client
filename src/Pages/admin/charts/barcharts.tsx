import { useSelector } from "react-redux";
import AdminSidebar from "../../../Components/admin/AdminSidebar";
import { customError } from "../../../Types/api";
import { BarChart } from "../../../Components/admin/Charts";
import { toast } from "react-hot-toast";
import { RootState } from "../../../Redux/store";
import { useBarQuery } from "../../../Redux/api/DashboardAPI";
import { Skeleton } from "../../../Components/Loader";
import { getLastMonths } from "../../../Utils/Feature";


const {last12Month , last6Month} = getLastMonths()

const Barcharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, error, isError } = useBarQuery(user?._id!);

  const barChart = data?.barChart;

  if (isError) {
    const err = error as customError;
    toast.error(err.data.message);
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        {isLoading ? (
          <Skeleton count={21}/>
        ) : (
          <>
            <section>
              <BarChart
                data_2={barChart?.users!}
                data_1={barChart?.products!}
                labels={last6Month}
                title_1="Products"
                title_2="Users"
                bgColor_1={`hsl(260, 50%, 30%)`}
                bgColor_2={`hsl(360, 90%, 90%)`}
              />
              <h2>Top Products & Top Customers</h2>
            </section>

            <section>
              <BarChart
                horizontal={true}
                data_1={barChart?.orders!}
                data_2={[]}
                title_1="Orders"
                title_2=""
                bgColor_1={`hsl(180, 40%, 50%)`}
                bgColor_2=""
                labels={last12Month}
              />
              <h2>Orders throughout the year</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Barcharts;
