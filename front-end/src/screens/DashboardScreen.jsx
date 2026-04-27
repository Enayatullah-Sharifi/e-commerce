import { useState } from "react";
import CustomersChart from "../dashboardComponents/charts/CustomersChart";
import ProductsChart from "../dashboardComponents/charts/ProductsChart";
import OrdersChart from "../dashboardComponents/charts/OrdersChart";
import SalesChart from "../dashboardComponents/charts/SalesChart";
import DashboardCustomerCart from "../dashboardComponents/DashboardCustomerCart";
import DashboardProductCart from "../dashboardComponents/DashboardProductCart";
import DashboardOrderCart from "../dashboardComponents/DashboardOrderCart";
import DashboardSalesCart from "../dashboardComponents/DashboardSalesCart";

const DashboardScreen = () => {
  const [activeChart, setActiveChart] = useState(null);

  const charts = {
    customers: <CustomersChart />,
    products: <ProductsChart />,
    orders: <OrdersChart />,
    sales: <SalesChart />,
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-2 pt-15">
        <DashboardCustomerCart onClick={() => setActiveChart("customers")} />
        <DashboardProductCart onClick={() => setActiveChart("products")} />
        <DashboardOrderCart onClick={() => setActiveChart("orders")} />
        <DashboardSalesCart onClick={() => setActiveChart("sales")} />
      </div>

      <div className="py-8">
        {charts[activeChart]}
      </div>
    </>
  );
};

export default DashboardScreen