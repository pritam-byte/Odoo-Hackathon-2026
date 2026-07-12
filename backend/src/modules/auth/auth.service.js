const bcrypt = require("bcrypt");

const prisma = require("../../config/prisma");
const ApiError = require("../../utils/api-error");
const { createToken } = require("../../utils/jwt");

const safeUser = ({ id, name, email, role, createdAt }) => {
  return {
    id,
    name,
    email,
    role,
    createdAt,
  };
};

const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
    },
  });

  return safeUser(user);
};

const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = createToken({
    userId: user.id,
    role: user.role,
  });

  return {
    token,
    user: safeUser(user),
  };
};

const getCurrentUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return safeUser(user);
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};