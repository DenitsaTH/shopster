import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        ref: 'Category'
    },
    sizes: {
        type: [String],
        enum: ['S', 'M', 'L', 'XL', 'XXL'],
        required: true
    },
    colors: {
        type: [String],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    images: [
        {
            type: String,
            required: true,
        },
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    price: {
        type: Number,
        required: true,
    },
    totalQty: {
        type: Number,
        required: true,
    },
    totalSold: {
        type: Number,
        required: true,
        default: 0,
    },
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
    });


// Virtual properties - do not persist in the MongoDB database but are computed dynamically
// using regular function here to have access to `this` keyword - the instance of the project we are fetching
ProductSchema.virtual('qtyLeft').get(function () {
    const product = this
    return product.totalQty - product.totalSold;
});

ProductSchema.virtual('totalReviews').get(function () {
    const product = this;
    return product?.reviews?.length;
});

ProductSchema.virtual('averageRating').get(function () {
    let totalRatings = 0;
    const product = this;

    product?.reviews?.forEach((review) => {
        totalRatings += review?.rating;
    });

    const averageRating = Number(totalRatings / product?.reviews?.length);
    return averageRating;
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;