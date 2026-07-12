const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("./auth.service");

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { token, user } = await loginUser(req.body);

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful.",
  });
};

const me = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.userId);

    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  me,
};
