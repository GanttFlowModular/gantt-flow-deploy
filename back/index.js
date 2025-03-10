import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './config/db.js';

dotenv.config();
const app = express();

app.post("/users", async (req, res) => {
    const user = req.body; // user will send the product data in the body
    if (!user.name || !user.email || !user.mobile || !user.password) {
        return res.status(400).json({ success: false, message: 'Please fill all the fields' });
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error("Error in saving user", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
//Postman: POST http://localhost:5001/users 

app.listen(5001, () => {
    connectToDB();
    console.log('Server started on port 5001');
})