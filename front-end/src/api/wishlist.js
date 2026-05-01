// Add product to wishlist
export const addProductToWishlist = async (id) => {
  try {
    const res = await fetch(`${API}/api/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message);
    return data;
  } catch (err) {
    throw new Error(err?.message);
  }
};

// Get products wishlist
export const getWishlist = async () => {
  try {
    const res = await fetch(`${API}/api/wishlist`);
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data?.message);
    }
  
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

// Delete Product from wishlist
export const deleteProduct = async (e) => {
  try {
    const res = await fetch(`${API}/api/wishlist/${e}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message);
    }
    return data;
  } catch (err) {
    throw new Error(err?.message);
  }
};
