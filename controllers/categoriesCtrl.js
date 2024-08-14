import asyncHandler from 'express-async-handler'; // a middleware that helps in handling errors in asynchronous route handlers
import Category from '../models/Category.js';


export const createCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const categoryExists = await Category.findOne({ name: name.toLowerCase() });

    if (categoryExists) {
        throw new Error('Category already exists');
    }

    const category = await Category.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });

    res.json({
        status: 'success',
        message: 'Category successfully created',
        category,
    });
});


export const getCategoriesCtrl = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    res.json({
        status: "success",
        message: 'Categories fetched successfully',
        categories,
    });
});


export const getCategoryCtrl = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        throw new Error('Category not found');
    }

    res.json({
        status: 'success',
        message: 'Category fetched successfully',
        category,
    });
});


export const updateCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    
    const category = await Category.findByIdAndUpdate(
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
        message: 'Category successfully updated',
        category,
    });
});


export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);

    res.json({
        status: 'success',
        message: 'Category deleted successfully'
    });
});