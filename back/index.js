import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './config/db.js';
import usersRoutes from "./routes/users.route.js";
import adminRoutes from './routes/admin.route.js';

dotenv.config();
const app = express();

// Configura CORS para permitir headers personalizados
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['*'],
    allowedHeaders: ['Content-Type', 'Authorization','x-auth-token'], // Permite el header Authorization
    exposedHeaders: ['Content-Length', 'X-Powered-By'], // Evitar leaks
    credentials: true
}));
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
    connectToDB();
    console.log('Server started at http://localhost: ' + PORT);
})