import User from '../model/users.model..js';
import moongose from 'mongoose';
import bcrypt from 'bcrypt'; // Para comparar y hashear contraseñas
import jwt from 'jsonwebtoken'; // Para generar tokens JWT

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("error in fetching users:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

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
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Enviar respuesta exitosa
        res.status(200).json({ 
            success: true,
            token, 
            user: { id: user._id, name: user.name, email: user.email } 
        });
    } catch (error) {
        console.error('Error en login:', error.message);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

export const createUser = async (req, res) => {
    const user = req.body; // user will send the user data in the body

    // Validar que todos los campos estén presentes
    if (!user.name || !user.email || !user.mobile || !user.password) {
        return res.status(400).json({ success: false, message: 'Please fill all the fields' });
    }

    try {
        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(user.password, 10); // 10 es el número de rondas de hashing

        // Crear un nuevo usuario con la contraseña hasheada
        const newUser = new User({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            password: hashedPassword, // Usar la contraseña hasheada
        });

        // Guardar el usuario en la base de datos
        await newUser.save();
        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error("Error in saving user", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

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