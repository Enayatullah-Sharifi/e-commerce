import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddProductDialog from "./AddProductDialog";
import { deleteProductById, getAllProduct } from "../api/admin";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { toast } from "react-toastify";


const ProductCart = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
    staleTime: Infinity,
  });

  // Delete Functionality
  const deleteMutation = useMutation({
    mutationFn: deleteProductById, // API call
    onSuccess: (data) => {
      toast.warning(data?.message);
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure, you want to Delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
    });

    if (!result.isConfirmed) return;

    deleteMutation.mutate(id);
  };

  if (isLoading)
    return (
      <p className="w-full h-[100vh] flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </p>
    );
  if (isError)
    return (
      <p className="w-full h-[100vh] flex items-center justify-center">
        Error: {error.message}
      </p>
    );

  return (
    <>
      <div className=" pt-8 px-3 md:px-8 ">
        <div className="flex gap-2">
          <div className="my-5 bg-(--dark-red--color) px-2 py-1 text-center font-semibold text-white rounded-sm">
            <Link
              to="/dashboard"
              className=" bg-(--dark-red--color) text-white  rounded-sm dark:text-white/80"
            >
              Go Back
            </Link>
          </div>
          <div className="my-5 bg-(--dark-red--color) px-2 py-1  text-center font-semibold text-white rounded-sm">
            <AddProductDialog mode="add" />
          </div>
          <Link
            to="/dashboard/discount"
            className="my-5 bg-(--dark-red--color) px-2 py-1 text-center font-semibold text-white rounded-sm"
          >
            Add Discount
          </Link>
        </div>
        {data?.products?.length === 0 ? (
          <div>
            <div
              colSpan={5}
              className="text-center py-4 text-3xl font-semibold"
            >
              No products found !
            </div>
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto p-4 dark:bg-slate-900">
            <h2 className="text-2xl font-bold my-2 text-gray-800 w-fit whitespace-nowrap dark:text-white">
              📦 Product List
            </h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-xl dark:bg-slate-800">
              <table className="min-w-full border-collapse text-sm md:text-base">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left w-fit whitespace-nowrap">
                      Order ID
                    </th>

                    <th className="py-3 px-4 text-left w-fit whitespace-nowrap">
                      Product
                    </th>
                    <th className="py-3 px-4 text-left w-fit whitespace-nowrap">
                      Price
                    </th>
                    <th className="py-3 px-4 text-left w-fit whitespace-nowrap">
                      Quantity
                    </th>
                    <th className="py-3 px-4 text-left w-fit whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products?.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b hover:bg-gray-100 dark:hover:bg-slate-700 transition duration-150"
                    >
                      <td className="py-3 px-4 font-medium w-fit whitespace-nowrap">
                        {product._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="py-3 px-4 w-fit whitespace-nowrap">
                        {product.name}
                      </td>
                      <td className="py-3 px-4 w-fit whitespace-nowrap">
                        <span className="font-bold w-fit whitespace-nowrap">
                          $
                        </span>{" "}
                        {product.price}
                      </td>
                      <td className="py-3 px-4 w-fit whitespace-nowrap">
                        {product.qty}
                      </td>
                      <td className="py-3 px-4 w-fit whitespace-nowrap">
                        <div className="flex gap-2">
                          {/* EDIT */}
                          <div
                            className="px-3 py-1 text-sm font-medium rounded-md
                 bg-blue-100 text-blue-700
                 hover:bg-blue-200 transitio"
                          >
                            <AddProductDialog mode="edit" product={product} />
                          </div>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="px-3 py-1 text-sm font-medium rounded-md
                 bg-red-100 text-red-700
                 hover:bg-red-200 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCart;
