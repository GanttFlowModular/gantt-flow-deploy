import User from '../model/users.model..js';
import mongoose from 'mongoose';

export const getUsers = async (req, res) =>{
    try {
        const users = await User.find({});
        res.status(200).json({success: true, data: users});  
    } catch (error) {
        console.log("error in fetching users:",error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const createUser = async (req, res) => {
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
}

export const updatedUser = async (req, res) =>{
    const {id} = req.params;

    const user = req.body;

    if(!moongose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid User Id"});
    }

    try {
        const updatedUser= await User.findByIdAndUpdate(id, user,{new:true});
        res.status(200).json({success: true, data: updatedUser});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    //console.log("id:",id); 
    try {
     await User.findByIdAndDelete(id);
     res.status(200).json({success: true, message: "User deleted"});  
    } catch (error) {
     res.status(400).json({success: false, message: "User not found"});
    }
 }