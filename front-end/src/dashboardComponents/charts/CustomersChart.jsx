import { getCustomersStats } from "/src/api/admin";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CustomersChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomersStats,
  });

  const monthNames = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData =
    data?.stats?.map((item) => ({
      name: `${monthNames[item._id.month]} ${item._id.year}`,
      value: item.total,
    })) || [];

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
      <h3 className="mb-2 font-bold text-xl">
        <span className="m-2 ">Total Customer</span> {data?.totalUsers}
      </h3>

      {isLoading ? (
        <div className="w-full h-1/3 m-5 flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
