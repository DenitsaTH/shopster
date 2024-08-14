import asyncHandler from 'express-async-handler'; // a middleware that helps in handling errors in asynchronous route handlers
import Color from '../models/Color.js';


export const createColorCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const colorExists = await Color.findOne({ name: name.toLowerCase() });

    if (colorExists) {
        throw new Error('Color already exists');
    }

    const color = await Color.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });

    res.json({
        status: 'success',
        message: 'Color successfully created',
        color,
    });
});


export const getColorsCtrl = asyncHandler(async (req, res) => {
    const colors = await Color.find();

    res.json({
        status: "success",
        message: 'Colors fetched successfully',
        colors,
    });
});


export const getColorCtrl = asyncHandler(async (req, res) => {
    const color = await Color.findById(req.params.id);

    if (!color) {
        throw new Error('Color not found');
    }

    res.json({
        status: 'success',
        message: 'Color fetched successfully',
        color,
    });
});


export const updateColorCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    
    const color = await Color.findByIdAndUpdate(
        req.params.id,
        {
            name,
        },
        {
            new: true,
        }
    );
    res.json({
        status: 'success',
        message: 'Color successfully updated',
        color,
    });
});


export const deleteColorCtrl = asyncHandler(async (req, res) => {
    await Color.findByIdAndDelete(req.params.id);

    res.json({
        status: 'success',
        message: 'Color deleted successfully'
    });
});