import AsyncHandler from 'express-async-handler';
import Product from '../models/Product.js';


export const createProductCtrl = AsyncHandler(async(req,res) => {
    const {name, description, brand, category, sizes, 
        colors, price, totalQty } = req.body;

    const productExists = await Product.findOne({name});

    if(productExists){
        throw new Error('Product already exists');
    }

    const product = await Product.create({
        name,
        description,
        brand, 
        category, 
        sizes, 
        colors, 
        user: req.userAuthId,
        price, 
        totalQty,
    });
    res.json({
        status: 'success',
        message: 'Product created successfully',
        product,
    });
});


export const getProductCtrl = AsyncHandler(async(req, res) => {
    const product = await Product.find();
    res.json({
        status: "success",
        product
    });

});