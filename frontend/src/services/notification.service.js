import api from "./api";

export const getUserNotifications = async () => {
  const res = await api.get("/notifications"); 
  return res.data;
};
