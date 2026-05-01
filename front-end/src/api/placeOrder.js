export const placeOrder = async function (cartItems) {
  
  try {
    const res = await fetch(`${API}/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message);
    }

    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getOrders = async () => {
  const res = await fetch(`${API}/api/order`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch orders");
  }

  const data = await res.json();

  return data.orders;
};
