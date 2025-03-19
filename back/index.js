import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './config/db.js';
import usersRoutes from "./routes/users.route.js";
import adminRoutes from './routes/admin.route.js';
import settingsRoutes from './routes/settings.route.js';

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
    connectToDB();
    console.log('Server started at http://localhost: ' + PORT);
})