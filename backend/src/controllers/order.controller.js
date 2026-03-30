import orderService from "../services/order.service.js";
import Order from "../models/order.js";
import { sendOrderStatusEmail } from "../utils/email.utils.js";

export const placeOrder = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Payment screenshot is required",
      });
    }

    const items = JSON.parse(req.body.items);

    const orderData = {
      user: req.body.user || req.body.user_id,
      items: items,
      total_price: req.body.total_price,
      shipping_address: req.body.shipping_address,
      phone_number: req.body.phone_number,
      transaction_image: req.file.path, // Path from Multer
    };

    const order = await orderService.createOrder(orderData);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate("items.product", "name image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderService.updateOrderStatus(req.params.id, status);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    ).populate("user", "username email");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (order.user?.email) {
      await sendOrderStatusEmail(order.user.email, {
        orderId: order._id.toString(),
        status: order.status,
        username: order.user.username,
        totalPrice: order.total_price,
      });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
