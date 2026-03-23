import Service from "../models/Service.js";

// Create service for a community
const create = async ({ community_post_id, name, description, price }) => {
  return await Service.create({
    community_post_id,
    name,
    description,
    price,
  });
};

// Get services of a community
const getByCommunity = async (community_post_id) => {
  return await Service.find({ community_post_id });
};

// Delete service
const remove = async (service_id) => {
  const service = await Service.findById(service_id);

  if (!service) {
    throw new Error("Service not found");
  }

  await Service.findByIdAndDelete(service_id);
};

// Update service
const update = async (service_id, updateData) => {
  const service = await Service.findById(service_id);

  if (!service) {
    throw new Error("Service not found");
  }

  const updatedService = await Service.findByIdAndUpdate(
    service_id,
    updateData,
    { new: true },
  );

  return updatedService;
};

export default {
  create,
  getByCommunity,
  remove,
  update,
};
