// src/app/Services/ServiceController.js
import db from "../../Config/models.js";
const Service = db.Service;

// Get all services
export const getServiceData = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get Single Service
export const getSingleServiceData = async (req, res) => {
    try {
        const { slug } = req.params;
        const service = await Service.findOne({ where: { slug } });
        if (!service) return res.status(404).json({ message: "Not Found" });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create service
export const createServiceData = async (req, res) => {
    try {
        const { name, slug, detail, head, whyChoose } = req.body;

        const icon = req.files?.icon
            ? `${req.protocol}://${req.get("host")}/uploads/${req.files.icon[0].filename}`
            : null;

        const image = req.files?.image
            ? `${req.protocol}://${req.get("host")}/uploads/${req.files.image[0].filename}`
            : null;

        const newService = await Service.create({
            name,
            slug,
            icon,
            image,
            detail,
            head,
            whyChoose,
        });

        res.json(newService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update service
export const updateServiceData = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, detail, head, whyChoose } = req.body;

        const updateFields = { name, slug, detail, head, whyChoose };

        if (req.files?.icon) {
            updateFields.icon = `${req.protocol}://${req.get("host")}/uploads/${req.files.icon[0].filename}`;
        }
        if (req.files?.image) {
            updateFields.image = `${req.protocol}://${req.get("host")}/uploads/${req.files.image[0].filename}`;
        }

        const [updated] = await Service.update(updateFields, { where: { id } });
        if (!updated) return res.status(404).json({ message: "Not Found" });

        const updatedService = await Service.findByPk(id);
        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete service
export const deleteServiceData = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Service.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: "Not Found" });
        res.json({ message: "Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
