import asyncHandler from 'express-async-handler'; // a middleware that helps in handling errors in asynchronous route handlers
import Category from '../models/Category.js';


export const createCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const categoryExists = await Category.findOne({ name: name.toLowerCase() });

    if (categoryExists) {
        throw new Error('Category already exists');
    }

    const category = await Category.create({
        name: name?.toLowerCase(),
        user: req.userAuthId,
        image: req?.file?.path,
    });

    res.json({
        status: 'success',
        message: 'Category successfully created',
        category,
    });
});