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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/api', homeRoute);
app.use('/api', aboutRoute);
app.use('/api', productRoute);
app.use('/api', serviceRoute);
app.use('/api/auth', authRoute);

db.sequelize.sync({ alter: true })
    .then(async () => {
        // default user create
        await createDefaultUser();

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch((err) => console.error(' Database Connection Error:', err));
