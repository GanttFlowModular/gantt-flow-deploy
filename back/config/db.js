import mongoose from 'mongoose';

export const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_STRING, {
            dbName: 'gantt-flow', // Nombre de la base de datos
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1); // process code 1 means a failure, 0 means success
    }
};