const bcrypt = require("bcrypt");
const { randomUUID } = require("crypto");

const store = require("../../data/memory.store");
const { createToken } = require("../../utils/jwt");

const safeUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};

const registerUser = async ({ name, email, password, role }) => {
  const existingUser = store.users.find(
    (user) => user.email === email
  );

  if (existingUser) {
    const error = new Error("An account with this email already exists.");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const newUser = {
    id: randomUUID(),
    name,
    email,
    passwordHash,
    role,
    createdAt: new Date().toISOString(),
  };

  store.users.push(newUser);

  return safeUser(newUser);
};

const loginUser = async ({ email, password }) => {
  const user = store.users.find(
    (currentUser) => currentUser.email === email
  );

  if (!user) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
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

const getCurrentUser = async (userId) => {
  const user = store.users.find(
    (currentUser) => currentUser.id === userId
  );

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  return safeUser(user);
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
