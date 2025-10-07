import db from "../../Config/models.js";

const Home = db.Home;

export const gethomeData = async (req, res) => {
    try {
        const data = await Home.findAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createHomeData = async (req, res) => {
    try {
        const { title, heading, description, buttonText } = req.body;
        const image = req.file ? req.file.filename : null;

        const newData = await Home.create({
            title,
            heading,
            description,
            buttonText,
            image,
        });

        res.json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSingleHomeData = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Home.findByPk(id);
        if (!data) return res.status(404).json({ message: "Not found" });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateHomeData = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, heading, description, buttonText } = req.body;
        const image = req.file ? req.file.filename : null;

        const data = await Home.findByPk(id);
        if (!data) return res.status(404).json({ message: "Not found" });

        data.title = title;
        data.heading = heading;
        data.description = description;
        data.buttonText = buttonText;
        if (image) data.image = image;

        await data.save();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteHomeData = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Home.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
