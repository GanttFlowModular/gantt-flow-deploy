import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const connectionString = process.env.DB_STRING;

const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            autoIndex: true
        })
        console.log('Connnected to Mongodb Atlas');
    } catch (error) {
        console.log(error);
    }
}

export default connectToDB;