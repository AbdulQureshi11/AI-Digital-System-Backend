// src/app/Services/ServiceRoute.js
import express from "express";
import multer from "multer";
import path from "path";
import {
    createServiceData,
    deleteServiceData,
    getServiceData,
    getSingleServiceData,
    updateServiceData,
} from "./ServiceController.js";

const serviceRoute = express.Router();

// Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
    },
});

const upload = multer({ storage });

// Multiple file fields
const serviceUploadFields = upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "image", maxCount: 1 },
]);

// Routes
serviceRoute.get("/servicedata", getServiceData);
serviceRoute.get("/services/:slug", getSingleServiceData); // slug based detail
serviceRoute.post("/createservicedata", serviceUploadFields, createServiceData);
serviceRoute.put("/service/:id", serviceUploadFields, updateServiceData);
serviceRoute.delete("/service/:id", deleteServiceData);

export default serviceRoute;
