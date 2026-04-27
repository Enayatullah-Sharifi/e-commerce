import React from "react";
import ProductCart from "../dashboardComponents/Products";

const ProductScreen = () => {
  return (
    <>
      <div className="min-h-screen bg-slate-300 dark:bg-slate-900 dark:text-white">
        <ProductCart />
      </div>
    </>
  );
};

export default ProductScreen;
