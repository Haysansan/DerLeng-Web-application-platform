import Order from "../models/order.js";

const createOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};

const getOrdersByUser = async (userId) => {
  return await Order.find({ user: userId })
    .populate("items.product", "name image")
    .sort({ createdAt: -1 });
};


const getAllOrders = async () => {
  return await Order.find()
    .populate("user", "username email") 
    .populate("items.product", "name image") 
    .sort({ createdAt: -1 });
};

const updateOrderStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
};

const deleteOrder = async (orderId) => {
  return await Order.findByIdAndDelete(orderId);
};

export default { createOrder, getOrdersByUser, getAllOrders, updateOrderStatus, deleteOrder };
