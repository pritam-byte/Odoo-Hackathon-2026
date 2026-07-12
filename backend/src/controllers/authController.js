import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({ status, message, data });
};

export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return handleResponse(res, 400, "Email already in use");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                role: role || 'DISPATCHER'
            }
        });

        // Don't return password hash
        const { passwordHash: _, ...userWithoutPassword } = newUser;
        handleResponse(res, 201, "User registered successfully", userWithoutPassword);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return handleResponse(res, 401, "Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return handleResponse(res, 401, "Invalid credentials");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || "your_super_secret_key",
            { expiresIn: '1d' }
        );

        const { passwordHash: _, ...userWithoutPassword } = user;
        
        handleResponse(res, 200, "Login successful", {
            user: userWithoutPassword,
            token
        });
    } catch (error) {
        next(error);
    }
};
