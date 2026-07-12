const { Prisma } = require("@prisma/client");

const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return res.status(409).json({
      success: false,
      message: "A record with this unique value already exists.",
    });
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};

module.exports = {
  errorHandler,
};