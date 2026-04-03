import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }
        if(password.length < 6){
            return res.status(400).json({message: 'Password must be at least 6 characters'});
        }
        if(!/\S+@\S+\.\S+/.test(email)){
            return res.status(400).json({message: 'Invalid email format'});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'Email already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });
        if(newUser){
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);
             res.status(201).json({message: 'User created successfully'});
        }
        else{
            res.status(400).json({message: 'Failed to create user'});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Internal Server error'});
    }
};

export const login = (req, res) => {
  res.send('login World!');
};

export const logout = (req, res) => {
  res.send('logout World!');
};  