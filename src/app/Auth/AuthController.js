// src/app/Auth/AuthController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authModel from "./AuthModel.js";

export const createDefaultUser = async () => {
    try {
        const existingUser = await authModel.findOne({ where: { username: "admin" } });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            await authModel.create({
                username: "admin",
                password: hashedPassword,
            });
            console.log("Default admin user created: username=admin, password=admin123");
        }
    } catch (error) {
        console.error("Error creating default user:", error);
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await authModel.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({ message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
