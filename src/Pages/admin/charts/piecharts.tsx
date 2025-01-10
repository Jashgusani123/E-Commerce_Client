import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../Components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../Components/admin/Charts";
import { usePieQuery } from "../../../Redux/api/DashboardAPI";
import { RootState } from "../../../Redux/store";
import { customError } from "../../../Types/api";
import { Skeleton } from "../../../Components/Loader";

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, error, isError } = usePieQuery(user?._id!);

  const piechart = data?.pieChart;

  if (isError) {
    const err = error as customError;
    toast.error(err.data.message);
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>
        {isLoading ? (
          <Skeleton count={21}/>
        ) : (
          <>
            <section>
              <div>
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[piechart?.orderFullFillment.processing!, piechart?.orderFullFillment.shipped!, piechart?.orderFullFillment.delivered!]}
                  backgroundColor={[
                    `hsl(110,80%, 80%)`,
                    `hsl(110,80%, 50%)`,
                    `hsl(110,40%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Order Fulfillment Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={piechart?.ProductCategory?.map((i) => Object.keys(i)[0])!}
                  data={piechart?.ProductCategory?.map((i) => Object.values(i)[0])!}
                  backgroundColor={piechart?.ProductCategory?.map(
                    (i) => `hsl(${Number(Object.values(i)[0])*Math.random() * 4}, ${Object.values(i)[0]}%, 50%)`
                  )! }
                  legends={false}
                  offset={[0, 0, 0, 80]}
                />
              </div>
              <h2>Product Categories Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["In Stock", "Out Of Stock"]}
                  data={[piechart?.stockAvailablity.inStock!, piechart?.stockAvailablity.outOfStock!]}
                  backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                  legends={false}
                  offset={[0, 80]}
                  cutout={"70%"}
                />
              </div>
              <h2> Stock Availability</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[piechart?.revenueDistribution.marketingCost!, piechart?.revenueDistribution.discount!, piechart?.revenueDistribution.burnt!, piechart?.revenueDistribution.productionCost!, piechart?.revenueDistribution.netMargin!]}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(69,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53, 162, 255)",
                  ]}
                  legends={false}
                  offset={[20, 30, 20, 30, 80]}
                />
              </div>
              <h2>Revenue Distribution</h2>
            </section>

            <section>
              <div>
                <PieChart
                  labels={[
                    "Teenager(Below 20)",
                    "Adult (20-40)",
                    "Older (above 40)",
                  ]}
                  data={[piechart?.userAgesGroup.teen!, piechart?.userAgesGroup.adult!, piechart?.userAgesGroup.old!]}
                  backgroundColor={[
                    `hsl(10, ${80}%, 80%)`,
                    `hsl(10, ${80}%, 50%)`,
                    `hsl(10, ${40}%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Users Age Group</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[piechart?.adminCoustmoers.admin!, piechart?.adminCoustmoers.coustmoers!]}
                  backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                  offset={[0, 50]}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default PieCharts;
