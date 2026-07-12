const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//const { errorHandler } = require("./middleware/error.middleware.js");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "TransitOps backend is running",
  });
});

//app.use(errorHandler);

module.exports = app;