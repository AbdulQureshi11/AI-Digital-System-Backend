import cors from 'cors';
import express from 'express';
import db from './src/Config/models.js';
import homeRoute from './src/app/Home/HomeRoute.js';
import aboutRoute from './src/app/Aboutus/AboutusRoute.js';
import productRoute from './src/app/Product/ProductRoute.js';
import serviceRoute from './src/app/Services/ServiceRoute.js';
import authRoute from './src/app/Auth/AuthRoute.js';
import { createDefaultUser } from './src/app/Auth/AuthController.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 9000;

app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log("Uploads folder path:", path.join(__dirname, "uploads"));

/* Routes */
app.use('/api', homeRoute);
app.use('/api', aboutRoute);
app.use('/api', productRoute);
app.use('/api', serviceRoute);
app.use('/api/auth', authRoute);

/* Database + Server Start */
db.sequelize.sync({ alter: true })
    .then(async () => {
        await createDefaultUser();

        app.listen(port, "0.0.0.0", () => {
            console.log(`✅ Server running at: http://localhost:${port}`);
            console.log(`🌐 Accessible via LAN: http://192.168.1.6:${port}`);
        });
    })
    .catch((err) => console.error('❌ Database Connection Error:', err));
