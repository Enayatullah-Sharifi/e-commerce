import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { getAllOrders } from "/src/api/admin";
import { Loader2 } from "lucide-react";

export default function SalesChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["sales"],
    queryFn: getAllOrders,
    staleTime: Infinity,
  });
  const getWeek = (date) => {
    const d = new Date(date);
    const oneJan = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - oneJan) / 86400000 + oneJan.getDay() + 1) / 7);
  };

  const chartData =
    data?.orders?.reduce((acc, order) => {
      const week = getWeek(order.createdAt);
      const year = new Date(order.createdAt).getFullYear();

      const label = `Week ${week} - ${year}`;

      const found = acc.find((item) => item.name === label);

      if (found) {
        found.value += order.totalPrice;
      } else {
        acc.push({
          name: label,
          value: order.totalPrice,
        });
      }

      return acc;
    }, []) || [];

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
      <h3 className="text-sm font-semibold mb-2">Sales ($)</h3>
      {isLoading ? (
        <div className="w-full h-1/3 m-5 flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />

            <YAxis tickFormatter={(value) => value.toFixed(2)} />

            <Tooltip formatter={(value) => value.toFixed(2)} />

            <Bar
              dataKey="value"
              fill="#e11d48"
              radius={[6, 6, 0, 0]} // rounded top corners
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
