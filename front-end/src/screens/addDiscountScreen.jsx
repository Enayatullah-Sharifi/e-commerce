import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { createSale } from "../api/admin";

const AddDiscountScreen = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    discountPercent: "",
    endsAt: "",
  });

  const { discountPercent, endsAt } = formData;

  const mutation = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      toast.success("Discount added successfully");
      queryClient.invalidateQueries(["active-sale"]);
      setFormData({
        discountPercent: "",
        endsAt: "",
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      discountPercent: Number(discountPercent),
      endsAt,
    });
  };

  return (
    <div className="w-full h-screen bg-white dark:bg-slate-900 flex items-center justify-center">

    
    <div className="max-w-xl w-lg   p-6 bg-white rounded-xl shadow dark:bg-slate-800 dark:text-white">
      <Link to="/dashboard/products" className="float-end">
        <FaTimes className="text-2xl" />
      </Link>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Create Discount Sale
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Discount Percent */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600 dark:text-white">
            Discount Percentage
          </label>
          <input
            type="number"
            name="discountPercent"
            value={discountPercent}
            onChange={handleChange}
            min={1}
            max={90}
            required
            className="border rounded px-3 h-10"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600 dark:text-white">
            Sale End Date & Time
          </label>
          <input
            type="datetime-local"
            name="endsAt"
            value={endsAt}
            onChange={handleChange}
            required
            className="border rounded px-3 h-10"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          {mutation.isPending ? "Saving..." : "Create Sale"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddDiscountScreen;
