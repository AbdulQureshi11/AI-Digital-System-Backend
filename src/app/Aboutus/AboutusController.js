// src/app/Aboutus/AboutusController.js
import db from "../../Config/models.js";

const About = db.About;

const getFileUrl = (req, fieldName) => {
    if (!req.files) return null;
    const file = req.files.find((f) => f.fieldname === fieldName);
    if (!file) return null;


    const host = "192.168.1.6";
    const port = 9000;

    return `http://${host}:${port}/uploads/${file.filename}`;
};

// Get All
export const getAboutData = async (req, res) => {
    try {
        const data = await About.findAll();
        res.json(data);
    } catch (error) {
        console.error("GET ALL ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Create
export const createAboutData = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        const { title, description, bottomText1, bottomText2, buttonText } =
            req.body;

        const newData = await About.create({
            title,
            description,
            bottomText1,
            bottomText2,
            buttonText,
            topImage1: getFileUrl(req, "topImage1"),
            topImage2: getFileUrl(req, "topImage2"),
            movingImage: getFileUrl(req, "movingImage"),
            bottomImage1: getFileUrl(req, "bottomImage1"),
            bottomImage2: getFileUrl(req, "bottomImage2"),
        });

        res.json(newData);
    } catch (error) {
        console.error("CREATE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get Single
export const getSingleAboutData = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await About.findByPk(id);
        if (!data) return res.status(404).json({ message: "Not Found" });
        res.json(data);
    } catch (error) {
        console.error("GET SINGLE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update
export const updateAboutData = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        const { title, description, bottomText1, bottomText2, buttonText } =
            req.body;

        const updateFields = {
            title,
            description,
            bottomText1,
            bottomText2,
            buttonText,
        };

        const fileFields = [
            "topImage1",
            "topImage2",
            "movingImage",
            "bottomImage1",
            "bottomImage2",
        ];
        fileFields.forEach((field) => {
            const url = getFileUrl(req, field);
            if (url) updateFields[field] = url;
        });

        const [updated] = await About.update(updateFields, { where: { id } });
        if (!updated) return res.status(404).json({ message: "Not Found" });

        const updatedData = await About.findByPk(id);
        res.json(updatedData);
    } catch (error) {
        console.error("UPDATE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Delete
export const deleteAboutData = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await About.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: "Not Found" });
        res.json({ message: "Deleted Successfully" });
    } catch (error) {
        console.error("DELETE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};
