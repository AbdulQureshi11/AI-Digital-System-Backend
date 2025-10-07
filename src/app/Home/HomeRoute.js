import express from 'express';
import multer from 'multer';
import {
    createHomeData,
    deleteHomeData,
    gethomeData,
    getSingleHomeData,
    updateHomeData
} from './HomeController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

//Multer
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/svg+xml"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed (jpeg, jpg, png, gif, svg)"));
    }
};

const upload = multer({ storage, fileFilter });

router.get('/homedata', gethomeData);
router.post('/createdata', upload.single('image'), createHomeData);
router.get('/home/:id', getSingleHomeData);
router.put('/home/:id', upload.single('image'), updateHomeData);
router.delete('/home/:id', deleteHomeData);

export default router;
