import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const registerUserCtrl = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    // check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error('User already exists');
    }

    // hash pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        status: "success",
        message: "User successfully created!",
        data: user,
    });
});


export const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check if user exists
    const userFound = await User.findOne({ email });

    // `userFound?.password` is the same as `userFound && userFound.password`
    if (userFound && await bcrypt.compare(password, userFound?.password)) {
        res.json({
            message: 'Successful login',
            userFound,
            token: generateToken(userFound?._id)
        });
    } else {
        throw new Error('Invalid login credentials');
    }
});


export const getUserProfileCtrl = asyncHandler(async(req, res) => {
    res.json({
        msg: 'Welcome to Profile Page',
    })
})