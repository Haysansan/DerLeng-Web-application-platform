import api from "./api";

export const placeOrder = async (formData) => {
  return await api.post("/orders", formData);
};

export const getMyOrders = async (userId) => {
  return await api.get(`/orders/user/${userId}`);
};

export const getAllOrders = async () => {
  return await api.get("/orders/admin/all");
};

export const updateOrderStatus = async (orderId, status) => {
  return await api.put(`/orders/${orderId}/status`, { status });
};
