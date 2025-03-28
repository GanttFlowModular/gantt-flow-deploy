import User from '../model/users.model.js';
import moongose from 'mongoose';
import bcrypt from 'bcrypt'; // Para comparar y hashear contraseñas
import jwt from 'jsonwebtoken'; // Para generar tokens JWT
import crypto from "crypto";
import nodemailer from "nodemailer";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("error in fetching users:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const sendRecoveryEmail = async (req, res) => {
    const { email } = req.body;

    try {
        // Buscar al usuario por su correo
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Generar un token único
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hora de validez

        // Guardar el token en la base de datos
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();

        // Enviar el correo con el enlace de restablecimiento
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // O el servicio que uses
            auth: {
                user: process.env.EMAIL_USER, // Tu correo
                pass: process.env.EMAIL_PASS, // Tu contraseña
            },
        });

        const resetUrl = `http://localhost:3000/auth/reset-password?token=${resetToken}`;

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Restablecimiento de contraseña Gantt-Flow',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #4CAF50;">Hola, ${user.name}</h2>
                    <p>Hemos recibido una solicitud para restablecer tu contraseña en <strong>Gantt-Flow</strong>.</p>
                    <p>Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                    <p>
                        <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                            Restablecer contraseña
                        </a>
                    </p>
                    <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
                    <p>Gracias,</p>
                    <p>El equipo de <strong>Gantt-Flow</strong></p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Correo de restablecimiento enviado' });
    } catch (error) {
        console.error('Error al enviar el correo de recuperación:', error.message);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

// Función para restablecer la contraseña
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Buscar al usuario por el token y verificar que no haya expirado
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Verificar que el token no haya expirado
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Token inválido o expirado' });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña y limpiar el token
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Contraseña restablecida exitosamente' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error.message);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Comparar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Credenciales incorrectas' });
        }

        // Generar token JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Enviar respuesta exitosa
        res.status(200).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Error en login:', error.message);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
}

export const createUser = async (req, res) => {
    const user = req.body; // user will send the user data in the body

    // Validar que todos los campos estén presentes
    if (!user.name || !user.email || !user.mobile || !user.password) {
        return res.status(400).json({ success: false, message: 'Please fill all the fields' });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(user.password, 10); // 10 es el número de rondas de hashing

        // Crear un nuevo usuario con la contraseña hasheada
        const newUser = new User({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            password: hashedPassword, // Usar la contraseña hasheada
            role: user.role,
            resetPasswordToken: null, // Campo para el token de restablecimiento (opcional, Mongoose lo hace por ti)
            resetPasswordExpires: null, // Campo para la fecha de expiración del token (opcional, Mongoose lo hace por ti)
        });

        // Guardar el usuario en la base de datos
        await newUser.save();
        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error("Error in saving user", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const updatedUser = async (req, res) => {
    const { id } = req.params;

    const user = req.body;

    if (!moongose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid User Id" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    //console.log("id:",id); 

    if (!moongose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid User Id" });
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}