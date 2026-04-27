import { getAllProduct } from "/src/api/admin";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ProductsChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
    staleTime: Infinity,
  });
  const chartData =
    data?.products?.reduce((acc, product) => {
      const found = acc.find((item) => item.category === product.category);

      if (found) {
        found.count += 1;
      } else {
        acc.push({ category: product.category, count: 1 });
      }

      return acc;
    }, []) || [];
  return (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow relative z-0 isolate">
    <h3 className="text-sm font-semibold mb-2">Products</h3>

    {isLoading ? (
      <div className="w-full h-1/3 m-5 flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    ) : (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )}
  </div>
);
}
