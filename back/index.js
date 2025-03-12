import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './config/db.js';
import usersRoutes from "./routes/users.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/users", usersRoutes); //si quieres correr el back, dará error, pero quedó construida la API en el lado del backend

app.listen(5001, () => {
    connectToDB();
    console.log('Server started at http://localhost: ' + PORT);
})