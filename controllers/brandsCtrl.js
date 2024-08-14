import asyncHandler from 'express-async-handler'; // a middleware that helps in handling errors in asynchronous route handlers
import Brand from '../models/Brand.js';


export const createBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const brandExists = await Brand.findOne({ name: name.toLowerCase() });

    if (brandExists) {
        throw new Error('Brand already exists');
    }

    const brand = await Brand.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });

    res.json({
        status: 'success',
        message: 'Brand successfully created',
        brand,
    });
});


export const getBrandsCtrl = asyncHandler(async (req, res) => {
    const brands = await Brand.find();

    res.json({
        status: "success",
        message: 'Brands fetched successfully',
        brands,
    });
});


export const getBrandCtrl = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
        throw new Error('Brand not found');
    }

    res.json({
        status: 'success',
        message: 'Brand fetched successfully',
        brand,
    });
});


export const updateBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    
    const brand = await Brand.findByIdAndUpdate(
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
        message: 'Brand successfully updated',
        brand,
    });
});


export const deleteBrandCtrl = asyncHandler(async (req, res) => {
    await Brand.findByIdAndDelete(req.params.id);

    res.json({
        status: 'success',
        message: 'Brand deleted successfully'
    });
});