import db from "../../Config/models.js";
const Service = db.Service;


const getFileUrl = (req, fileArrayName) => {
    if (!req.files) return null;
    const file = req.files[fileArrayName]?.[0];
    if (!file) return null;

    const host = "192.168.1.6";
    const port = 9000;

    return `http://${host}:${port}/uploads/${file.filename}`;
};

// Get all services
export const getServiceData = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Single Service
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

// Create Service
export const createServiceData = async (req, res) => {
    try {
        const { name, slug, detail, head, whyChoose } = req.body;

        const newService = await Service.create({
            name,
            slug,
            detail,
            head,
            whyChoose,
            icon: getFileUrl(req, "icon"),
            image: getFileUrl(req, "image"),
        });

        res.json(newService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Service
export const updateServiceData = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, detail, head, whyChoose } = req.body;

        const updateFields = { name, slug, detail, head, whyChoose };

        // Update images if uploaded
        const iconUrl = getFileUrl(req, "icon");
        if (iconUrl) updateFields.icon = iconUrl;

        const imageUrl = getFileUrl(req, "image");
        if (imageUrl) updateFields.image = imageUrl;

        const [updated] = await Service.update(updateFields, { where: { id } });
        if (!updated) return res.status(404).json({ message: "Not Found" });

        const updatedService = await Service.findByPk(id);
        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Service
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
