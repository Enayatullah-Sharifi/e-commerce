import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "/src/api/admin";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";



export default function OrdersChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    staleTime: Infinity,
  });
  const chartData =
    data?.orders?.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();

      const found = acc.find((item) => item.name === date);

      if (found) {
        found.value += 1;
      } else {
        acc.push({ name: date, value: 1 });
      }

      return acc;
    }, []) || [];

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
      <h3 className="text-sm font-semibold mb-2">Orders</h3>

      {isLoading ? (
        <div className="w-full h-1/3 m-5 flex items-center justify-center">

        <Loader2 className="animate-spin" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              fill="#fed7aa"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
