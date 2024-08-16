import asyncHandler from 'express-async-handler';
import Review from '../models/Review.js';
import Product from '../models/Product.js';


export const createReviewCtrl = asyncHandler(async (req, res) => {
    // 1. find the product

    const { message, rating } = req.body; // destructure the request
    const { productId } = req.params;
    const productFound = await Product.findById(productId).populate('reviews');

    // 2. if not found - throw Error
    if (!productFound) {
        throw new Error('No such product');
    }

    // 3. check for duplicate reviews

    /* the arrow function `(review) => { ... }` serves as the callback for `find()`. 
    It is executed for each review in the reviews array.*/
    const hasReviewed = productFound?.reviews?.find((review) => {
        return review?.user?.toString() === req.userAuthId.toString();
    });

    if (hasReviewed) {
        throw new Error('You have already reviewed this product');
    }

    // 4. extract review from req.body

    const productReview = await Review.create({
        message,
        rating, 
        product: productFound?._id, 
        user: req.userAuthId
});

    // 5. record review in db

    productFound.reviews.push(productReview?._id); // Optional Chaining syntax -> If productReview is null or undefined, the expression productReview?._id evaluates to undefined rather than throwing an error.
    await productFound.save();

    // 6. return response

    res.status(201).json({
        success: true,
        message: 'Product review successfully added'
    });
});

