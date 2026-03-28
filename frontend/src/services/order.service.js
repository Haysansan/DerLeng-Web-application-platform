import api from "./api";

export const placeOrder = async (formData, token) => {
  return await api.post("/orders", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token || localStorage.getItem("token")}`
    }
  });
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
