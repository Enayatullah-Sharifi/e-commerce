import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/admin";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const UsersScreen = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllUsers,
    
  });

  if (isLoading)
    return (
      <p className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </p>
    );
  if (isError)
    return (
      <p className="w-full h-screen flex items-center justify-center">
        Error: {error.message}
      </p>
    );

  return (
    <div className="dark:bg-slate-900 min-h-[92vh] ">
      <div className="w-full max-w-6xl mx-auto p-4 mt-12">
        <Link
          to="/dashboard"
          className=" bg-(--dark-red--color) text-white px-3 py-1 rounded-sm dark:text-white/80"
        >
          Go Back
        </Link>
        <h2 className="text-2xl font-bold my-6 text-gray-800 w-fit whitespace-nowrap dark:text-white">
          Customer List
        </h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-xl ">
          <table className="min-w-full border-collapse text-sm md:text-base dark:bg-slate-800 ">
            <thead className="bg-gray-100 text-gray-700">
              <tr className="">
                <th className="py-3 px-4 text-left">ID</th>

                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {data?.users?.length === 0 ? (
                <tr>
                  <td className="p-3 font-semibold dark:text-white">
                    No User found
                  </td>
                </tr>
              ) : (
                data?.users?.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-100 transition duration-150 w-fit whitespace-nowrap dark:hover:bg-slate-700 dark:text-white"
                  >
                    <td className="py-3 px-4 font-medium w-fit whitespace-nowrap">
                      {user._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="py-3 px-4 w-fit whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className="py-3 px-4 w-fit whitespace-nowrap">
                      {user.email}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersScreen;
