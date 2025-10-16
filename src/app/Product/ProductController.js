import db from "../../Config/models.js";
const Product = db.Product;

const getServerBaseURL = (req) => {
    const protocol = req.protocol;
    const host = req.get("host");
    return `${protocol}://${host}`;
};

const getFileUrl = (req, fieldName = "image") => {
    if (!req.file && !req.files) return null;

    let file = req.file;
    if (!file && req.files) {
        file = Array.isArray(req.files)
            ? req.files.find((f) => f.fieldname === fieldName)
            : req.files[fieldName]?.[0];
    }

    if (!file) return null;
    const baseURL = getServerBaseURL(req);
    return `${baseURL}/uploads/${file.filename}`;
};

// Get All
export const getProductData = async (req, res) => {
    try {
        const products = await Product.findAll({ order: [["id", "DESC"]] });
        res.json(products);
    } catch (error) {
        console.error("GET ALL PRODUCTS ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get Single by ID
export const getSingleProductData = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        console.error("GET SINGLE PRODUCT ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get by Slug
export const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await Product.findOne({ where: { slug } });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        console.error("GET PRODUCT BY SLUG ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Create
export const createProductData = async (req, res) => {
    try {
        const { name, slug, dis, detail, bullets, whyChoose, shortDesc, buttonText } = req.body;

        const image = getFileUrl(req, "image");

        const product = await Product.create({
            name,
            slug,
            dis,
            detail,
            bullets,
            whyChoose,
            shortDesc,
            buttonText,
            image,
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("CREATE PRODUCT ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update
export const updateProductData = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, dis, detail, bullets, whyChoose, shortDesc, buttonText } = req.body;

        const updateData = { name, slug, dis, detail, bullets, whyChoose, shortDesc, buttonText };

        const newImage = getFileUrl(req, "image");
        if (newImage) updateData.image = newImage;

        const [updated] = await Product.update(updateData, { where: { id } });
        if (!updated) return res.status(404).json({ message: "Product not found" });

        const fresh = await Product.findByPk(id);
        res.json(fresh);
    } catch (error) {
        console.error("UPDATE PRODUCT ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Delete
export const deleteProductData = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("DELETE PRODUCT ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};
