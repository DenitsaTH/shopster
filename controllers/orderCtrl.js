import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';


export const createOrderCtrl = asyncHandler(async (req, res) => {

  const { orderItems, shippingAddress, totalPrice } = req.body;
  const user = await User.findById(req.userAuthId);

  if (!user?.hasShippingAddress) {
    throw new Error('Please provide a shipping address');
  }

  if (orderItems?.length == 0) {
    throw new Error('Order cannot be empty');
  }

  const order = await Order.create({
    orderItems,
    shippingAddress,
    totalPrice,
    user: user?._id,
  });

  // Mongoose syntax -> the &in query operator will find any object that matches any of the specified values
  const products = await Product.find({ _id: { $in: orderItems } });

  orderItems?.map(async (order) => {
    const product = products?.find((product) => {
      return product?._id?.toString() === order?._id?.toString();
    });
    if (product) {
      product.totalSold += order.qty;
    }
    await product.save();
  });

  user.orders.push(order?._id);
  await user.save();

  res.json({
    success: true,
    message: 'Order created',
    order,
    user,
  });
});