const asyncHandler = require("../../utils/async-handler");
const authService = require("./auth.service");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully.",
    data: { user },
  });
});

const login = asyncHandler(async (req, res) => {
  const { token, user } = await authService.loginUser(req.body);

  res.cookie("token", token, cookieOptions);

  res.json({
    success: true,
    message: "Login successful.",
    data: { user },
  });
});

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.json({
    success: true,
    message: "Logout successful.",
  });
};

const me = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.userId);

  res.json({
    success: true,
    data: { user },
  });
});

module.exports = {
  register,
  login,
  logout,
  me,
};