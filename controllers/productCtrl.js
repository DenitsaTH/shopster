import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Brand from '../models/Brand.js';


export const createProductCtrl = asyncHandler(async (req, res) => {
    const { name, description, brand, category, sizes,
        colors, price, totalQty } = req.body;

    const productExists = await Product.findOne({ name });

    if (productExists) {
        throw new Error('Product already exists');
    }

    const categoryFound = await Category.findOne({ name: category });

    if (!categoryFound) {
        throw new Error ('Category not found');
    }

    const brandFound = await Brand.findOne({ name: brand?.toLowerCase(), });

    if (!brandFound) {
        throw new Error ('Brand not found');
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

    categoryFound.products.push(product._id);
    brandFound.products.push(product._id);

    await categoryFound.save();
    await brandFound.save();

    res.json({
        status: 'success',
        message: 'Product successfully created',
        product,
    });
});


export const getProductsCtrl = asyncHandler(async (req, res) => {
    let productQuery = Product.find();

    if (req.query.name) {
        productQuery = productQuery.find({
            name: { $regex: req.query.name, $options: 'i' },
        });
    }

    if (req.query.brand) {
        productQuery = productQuery.find({
            brand: { $regex: req.query.brand, $options: 'i' },
        });
    }

    if (req.query.category) {
        productQuery = productQuery.find({
            category: { $regex: req.query.category, $options: 'i' },
        });
    }

    if (req.query.color) {
        productQuery = productQuery.find({
            colors: { $regex: req.query.color, $options: 'i' },
        });
    }

    if (req.query.size) {
        productQuery = productQuery.find({
            sizes: { $regex: req.query.size, $options: 'i' },
        });
    }

    if (req.query.price) {
        const priceRange = req.query.price.split("-");
        productQuery = productQuery.find({
            price: { $gte: priceRange[0], $lte: priceRange[1] },
        })
    }

    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;  // defaults to 1 if no value is provided
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const total = await Product.countDocuments();

    productQuery = productQuery.skip(startIndex).limit(limit);

    const pagination = {}

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit,
            };
        }

    }
    const products = await productQuery.populate('reviews');

    res.json({
        status: "success",
        total,
        results: products.length,
        pagination,
        message: 'Products fetched successfully',
        products
    });
});


export const getProductCtrl = asyncHandler(async (req, res) => {
    /* populate -> a Mongoose method used to automatically replace the specified paths in a document 
    with the documents from other collections*/
    const product = await Product.findById(req.params.id).populate('reviews');

    if (!product) {
        throw new Error('Product not found');
    }

    res.json({
        status: 'success',
        message: 'Product fetched successfully',
        product,
    });
});


export const updateProductCtrl = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty,
        brand,
    } = req.body;

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            brand,
            category,
            sizes,
            colors,
            user,
            price,
            totalQty,
        },
        {
            new: true,
        }
    );
    res.json({
        status: 'success',
        message: 'Product updated successfully',
        product,
    });
});


export const deleteProductCtrl = asyncHandler(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
        status: 'success',
        message: 'Product deleted successfully'
    });
});