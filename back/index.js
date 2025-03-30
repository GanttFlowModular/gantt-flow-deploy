import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './config/db.js';
import usersRoutes from "./routes/users.route.js";
import adminRoutes from './routes/admin.route.js';

dotenv.config();
const app = express();

// Configuración dinámica para CORS
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({
    origin: FRONTEND_URL,
    methods: ['*'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
    exposedHeaders: ['Content-Length', 'X-Powered-By'],
    credentials: true
}));

const PORT = process.env.PORT || 5001;

app.use(express.json());

// Rutas
app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);

// Inicio del servidor
app.listen(PORT, () => {
    connectToDB();
    console.log(`Server running on port ${PORT}`);
    console.log(`CORS configured for origin: ${FRONTEND_URL}`);
});