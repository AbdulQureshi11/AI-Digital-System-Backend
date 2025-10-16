import db from "../../Config/models.js";
const About = db.About;

const getServerBaseURL = (req) => {
    const protocol = req.protocol;
    const host = req.get("host");
    return `${protocol}://${host}`;
};

const getFileUrl = (req, fieldName) => {
    if (!req.files) return null;

    const file =
        Array.isArray(req.files) && req.files.length > 0
            ? req.files.find((f) => f.fieldname === fieldName)
            : req.files[fieldName]?.[0];

    if (!file) return null;
    const baseURL = getServerBaseURL(req);
    return `${baseURL}/uploads/${file.filename}`;
};

// Get All
export const getAboutData = async (req, res) => {
    try {
        const abouts = await About.findAll({ order: [["id", "DESC"]] });
        res.json(abouts);
    } catch (error) {
        console.error("GET ABOUT ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get Single
export const getSingleAboutData = async (req, res) => {
    try {
        const { id } = req.params;
        const about = await About.findByPk(id);
        if (!about) return res.status(404).json({ message: "Not Found" });
        res.json(about);
    } catch (error) {
        console.error("GET SINGLE ABOUT ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Create
export const createAboutData = async (req, res) => {
    try {
        const { title, description, bottomText1, bottomText2, buttonText } = req.body;

        const about = await About.create({
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

        res.status(201).json(about);
    } catch (error) {
        console.error("CREATE ABOUT ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update
export const updateAboutData = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, bottomText1, bottomText2, buttonText } = req.body;

        const updateFields = {
            title,
            description,
            bottomText1,
            bottomText2,
            buttonText,
        };

        const fileFields = ["topImage1", "topImage2", "movingImage", "bottomImage1", "bottomImage2"];
        fileFields.forEach((field) => {
            const url = getFileUrl(req, field);
            if (url) updateFields[field] = url;
        });

        const [updated] = await About.update(updateFields, { where: { id } });
        if (!updated) return res.status(404).json({ message: "Not Found" });

        const updatedData = await About.findByPk(id);
        res.json(updatedData);
    } catch (error) {
        console.error("UPDATE ABOUT ERROR:", error);
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
        console.error("DELETE ABOUT ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};
