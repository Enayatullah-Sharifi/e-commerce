export function notFound(req, res, next) {
  const err = new Error(`Resource not found`);
  next(err);
}

export function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  console.log(err);
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  if (err?.keyValue && Object.values(err?.keyValue).length > 1) {
    statusCode = 400;
    message = "You already reviewed it!";
  }
  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "Development" ? err.stack : null,
  });
  next();
}
