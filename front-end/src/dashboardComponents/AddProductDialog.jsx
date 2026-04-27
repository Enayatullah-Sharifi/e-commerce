import { useState, useEffect } from "react";

import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

import { toast } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct, updateProduct } from "../api/admin";
import { Loader2 } from "lucide-react";

const AddProductDialog = ({ onClose, mode, product }) => {
  const queryClient = useQueryClient();

  const [imageIsUploading, setImageIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    qty: "",
    category: "",
    image: "",
    description: "",
  });

  const { name, price, qty, category, image, description } = formData;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fileUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    setImageIsUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setImageIsUploading(false);
        toast.error("Error Uploading file");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        image: data.image,
      }));
      setImageIsUploading(false);
      toast.success(data.message);
    } catch (err) {
      setImageIsUploading(false);
      toast.error(err?.message | err.error);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      toast.success("Product added successfully!");
      queryClient.invalidateQueries(["products"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateProduct({ id, data }),
    onSuccess: (data) => {
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries(["products"]); // refresh product list
    },
    onError: (error) => {
      toast.error(error.message || "Update failed");
    },
  });

  useEffect(() => {
    if (mode === "edit" && product) {
      setFormData({
        name: product.name,
        price: product.price,
        qty: product.qty,
        category: product.category,
        image: product.img,
        description: product.description,
      });
    }
  }, [mode, product]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (mode === "add") {
      mutate(formData);
      setFormData({
        name: "",
        price: "",
        qty: "",
        category: "",
        image: "",
      });
    } else {
      updateMutation.mutate({
        id: product._id,
        data: formData,
      });
    }
  };


  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className=" font-semibold rounded-md hover:cursor-pointer ">
            {mode === "add" ? "Add Product" : "Edit"}
          </button>
        </DialogTrigger>

        {/* <DialogTrigger>Add Product</DialogTrigger> */}
        <DialogContent className="flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[var(--dark-red--color)]">
              {mode === "add" ? "Add New Product" : "Edit Product"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>

          <form onSubmit={onSubmitHandler} className="gap-2 flex flex-col ">
            <div className="flex flex-col text-lg">
              <label className="text-slate-500 font-semibold">Name</label>
              <input
                required
                value={name}
                type="text"
                name="name"
                onChange={handleChange}
                id=""
                className="border rounded-sm h-10 px-3"
              />
            </div>
            <div className="flex flex-col text-lg">
              <label className="text-slate-500 font-semibold">Price</label>
              <input
                required
                value={price}
                type="number"
                name="price"
                onChange={handleChange}
                className="border rounded-sm h-10 px-3"
              />
            </div>
            <div className="flex flex-col text-lg">
              <label className="text-slate-500 font-semibold">Qty</label>
              <input
                required
                type="number"
                value={qty}
                name="qty"
                onChange={handleChange}
                className="border rounded-sm h-10 px-3"
              />
            </div>
            <div className="flex flex-col text-lg">
              <label className="text-slate-500 font-semibold">
                Description
              </label>
              <input
                required
                type="text"
                value={description}
                name="description"
                onChange={handleChange}
                className="border rounded-sm h-10 px-3"
              />
            </div>
            <div className="flex flex-col text-lg">
              <label className="text-slate-500 font-semibold">Category</label>

              <select
                className="focus:outline-none border rounded-sm h-10 px-3"
                onChange={handleChange}
                value={category}
                name="category"
                required
              >
                <option></option>
                <option value="electronic" className="">
                  Electronics
                </option>
                <option value="vehicle">Vehicle</option>
                <option value="cloths">Cloths</option>
              </select>
            </div>

            {/* image */}
            <div className="flex flex-col text-lg">
              <label className="text-slate-500 font-semibold">Image</label>
              <input
                required
                placeholder="Enter image url"
                value={image}
                type="text"
                name="image"
                onChange={handleChange}
                id=""
                className="border rounded-sm h-10 px-3"
              />
              {imageIsUploading ? (
                <h1>Image is Uploading...</h1>
              ) : (
                <input
                  type="file"
                  className="border rounded-sm h-10 px-3"
                  name="image"
                  onChange={fileUpload}
                />
              )}
            </div>
            <Button className="uppercase text-lg">
              {isPending ? (
                <Loader2 className="animate-spin bg-none" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProductDialog;
