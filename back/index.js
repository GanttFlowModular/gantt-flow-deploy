import express from 'express';
import connectToDB from './config/db.js';

const app = express();
connectToDB();

app.listen(3001, () => {
    console.log('Server started on port 3001');
})