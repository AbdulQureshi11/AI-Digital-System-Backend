// ProductController.js
import db from "../../Config/models.js";

const Product = db.Product;

const getImageUrl = (req, file) => {
    return file ? `${req.protocol}://${req.get("host")}/uploads/${file.filename}` : null;
};

// GET ALL 
export const getProductData = async (req, res) => {
    try {
        const products = await Product.findAll({ order: [["id", "DESC"]] });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE 
export const createProductData = async (req, res) => {
    try {
        const { name, slug, dis, detail, bullets, whyChoose, shortDesc, buttonText } = req.body;
        const image = getImageUrl(req, req.file);

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

        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET SINGLE (by ID)
export const getSingleProductData = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET SINGLE (by Slug) 
export const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await Product.findOne({ where: { slug } });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE
export const updateProductData = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, dis, detail, bullets, whyChoose, shortDesc, buttonText } = req.body;

        const updateData = { name, slug, dis, detail, bullets, whyChoose, shortDesc, buttonText };

        if (req.file) {
            updateData.image = getImageUrl(req, req.file);
        }

        const [updated] = await Product.update(updateData, { where: { id } });

        if (!updated) return res.status(404).json({ message: "Product not found" });

        const fresh = await Product.findByPk(id);
        res.json(fresh);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
export const deleteProductData = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
