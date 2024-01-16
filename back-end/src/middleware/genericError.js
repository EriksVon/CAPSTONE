export const genericError = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: errorMessage,
  });
};
