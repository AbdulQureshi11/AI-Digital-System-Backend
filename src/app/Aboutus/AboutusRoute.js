// src/app/Aboutus/AboutusRoute.js
import express from "express";
import multer from "multer";
import path from "path";

import {
    createAboutData,
    deleteAboutData,
    getAboutData,
    getSingleAboutData,
    updateAboutData,
} from "./AboutusController.js";

const aboutRoute = express.Router();

//Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/svg+xml",
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed (jpeg, jpg, png, gif, svg)"));
    }
};

// 🔹 Multer Instance
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

// Routes
aboutRoute.get("/aboutdata", getAboutData);
aboutRoute.get("/about/:id", getSingleAboutData);

aboutRoute.post("/createabout", upload.any(), createAboutData);
aboutRoute.put("/about/:id", upload.any(), updateAboutData);
aboutRoute.delete("/about/:id", deleteAboutData);

export default aboutRoute;
