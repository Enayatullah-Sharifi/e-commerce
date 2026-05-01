import API from "./base";
// Create Review
export const createReview = async function (id, review) {
  try {
    const res = await fetch(`${API}/api/product/reviews/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
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

// Get Reviews
export const getReviews = async function ({signal}, id) {
  try {
    const res = await fetch(`${API}/api/product/reviews/${id}`, { signal });
    const result = await res.json();

    if (!res.ok) throw new Error(result?.message);
    return {
      avgReviews: result.avgReviews,
      reviews: result.reviews,
      count: result.count,
    };
  } catch (err) {
    throw new Error(err?.message);
  }
};
