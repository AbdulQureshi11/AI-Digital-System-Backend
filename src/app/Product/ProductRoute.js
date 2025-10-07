// productRoute.js
import express from "express";
import multer from "multer";
import path from "path";
import {
    createProductData,
    deleteProductData,
    getProductData,
    getSingleProductData,
    updateProductData,
    getProductBySlug,
} from "./ProductController.js";

const productRoute = express.Router();

//Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = /jpg|jpeg|png|svg|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);

    if (ext && mime) {
        cb(null, true);
    } else {
        cb(new Error("Only jpg, jpeg, png, svg, webp images allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

//Routes
productRoute.get("/productdata", getProductData);

productRoute.post("/createproduct", upload.single("image"), createProductData);

productRoute.get("/product/:id", getSingleProductData);

productRoute.get("/product/slug/:slug", getProductBySlug);

productRoute.put("/product/:id", upload.single("image"), updateProductData);

productRoute.delete("/product/:id", deleteProductData);

export default productRoute;
