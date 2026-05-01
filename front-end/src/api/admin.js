import API from "./base";

export const getAllProduct = async () => {
  try {
    const res = await fetch("/api/admin/products");
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error getting products!");
      return;
    }

    return data;
  } catch (err) {
    throw new Error(err?.message);
    console.log(err);
  }
};

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${API}/api/admin/users`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Error getting user");
      return;
    }

    return data;
  } catch (err) {
    console.log(err?.message);
    throw new Error(err?.message || "Error getting users");
  }
};

export const getAllOrders = async () => {
  try {
    const res = await fetch(`${API}/api/admin/orders`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Error getting orders");
    }
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const updateOrderDelivery = async ({ orderId, delivered }) => {
  const res = await fetch(`${API}/api/admin/orders/${orderId}/deliver`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ delivered }),
  });

  if (!res.ok) {
    throw new Error("Failed to update delivery status");
  }

  return res.json();
};

export const deleteProductById = async (id) => {
  const res = await fetch(`${API}/api/admin/product/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return res.json();
};

export const addProduct = async (formData) => {
  try {
    const res = await fetch(`${API}/api/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    return data;
  } catch (err) {
    console.log(err?.message);
  }
};

export const updateProduct = async ({ id, data }) => {
  const res = await fetch(`${API}/api/admin/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update product");
  }

  return res.json();
};

export const fetchActiveSale = async () => {
  const res = await fetch(`${API}/api/admin/active`);
  if (!res.ok) throw new Error("Failed to fetch sale");
  return res.json();
};

export const createSale = async (data) => {
  const res = await fetch(`${API}/api/admin/sale`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create sale");
  return res.json();
};

export const getCustomersStats = async () => {
  try {
    const res = await fetch(`${API}/api/admin/customers`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Error getting orders");
    }

    return data;
  } catch (err) {
    console.log(err?.message);
    throw new Error(err);
  }
};
