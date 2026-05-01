import API from "./base";

export const getTopProducts = async function ({ signal }) {
  try {
    const res = await fetch(`${API}/api/product/top`, { signal });
    const result = await res.json();
    if (!res.ok) throw new Error(result?.message);
    return result.data;
  } catch (err) {
    throw new Error(err?.message);
  }
};

export const getAllProducts = async function (page, limit) {
  try {
    const res = await fetch(`${API}/api/product?page=${page}&limit=${limit}`);
    const result = await res.json();
    if (!res.ok) throw new Error(result?.message);
    return result;
  } catch (err) {
    throw new Error(err?.message);
  }
};

export const getProductById = async function ({ queryKey, signal }) {
  try {
    const [, id] = queryKey;
    const res = await fetch(`${API}/api/product/${id}`, { signal });

    if (!res.ok) throw new Error("Error getting product");
    const result = await res.json();
    return result.data;
  } catch (err) {
    throw new Error(err);
  }
};

// Get Images
export const getImages = async function () {
  try {
    const res = await fetch(`${API}/api/product/images`);

    if (!res.ok) throw new Error("No images found for slider");
    const result = await res.json();
    return result.imageUrls;
  } catch (err) {
    throw new Error(err);
  }
};
