import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: String, // Token para restablecer la contraseña
    resetPasswordExpires: Date, // Fecha de expiración del token
}, {
    timestamps: true //created at and updated at
});

const User = mongoose.model('User', userSchema);
//user is the name of the collection in the database
export default User;