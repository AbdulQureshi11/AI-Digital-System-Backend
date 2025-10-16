import db from "../../Config/models.js";
const Service = db.Service;

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
export const getServiceData = async (req, res) => {
    try {
        const services = await Service.findAll({ order: [["id", "DESC"]] });
        res.json(services);
    } catch (error) {
        console.error("GET ALL SERVICES ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get Single
export const getSingleServiceData = async (req, res) => {
    try {
        const { slug } = req.params;
        const service = await Service.findOne({ where: { slug } });
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.json(service);
    } catch (error) {
        console.error("GET SINGLE SERVICE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Create
export const createServiceData = async (req, res) => {
    try {
        const { name, slug, detail, head, whyChoose } = req.body;

        const service = await Service.create({
            name,
            slug,
            detail,
            head,
            whyChoose,
            icon: getFileUrl(req, "icon"),
            image: getFileUrl(req, "image"),
        });

        res.status(201).json(service);
    } catch (error) {
        console.error("CREATE SERVICE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update
export const updateServiceData = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, detail, head, whyChoose } = req.body;

        const updateData = { name, slug, detail, head, whyChoose };

        const iconUrl = getFileUrl(req, "icon");
        const imageUrl = getFileUrl(req, "image");

        if (iconUrl) updateData.icon = iconUrl;
        if (imageUrl) updateData.image = imageUrl;

        const [updated] = await Service.update(updateData, { where: { id } });
        if (!updated) return res.status(404).json({ message: "Service not found" });

        const fresh = await Service.findByPk(id);
        res.json(fresh);
    } catch (error) {
        console.error("UPDATE SERVICE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// Delete
export const deleteServiceData = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Service.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: "Service not found" });
        res.json({ message: "Service deleted successfully" });
    } catch (error) {
        console.error("DELETE SERVICE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};
