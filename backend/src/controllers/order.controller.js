import orderService from "../services/order.service.js";

export const placeOrder = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({
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