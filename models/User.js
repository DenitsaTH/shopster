import mongoose from 'mongoose';
const Schema = mongoose.Schema; // the Schema defines the structure of documents within a MongoDB collection


const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,  // stores references to orders made by the user
            ref: "Order",
        }
    ],
    wishlist:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WishList",
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    },
    hasShippingAddress: {
        type: Boolean,
        default: false,
    },
    shippingAddress: {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        postalCode: {
            type: String,
        },
        province: {
            type: String,
        },
        country: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
    },
},
{
    timestamps: true,  // automatically adds created_at and updated_at fields
}
);

// compile the schema to model
const User = mongoose.model('User', UserSchema);

export default User;