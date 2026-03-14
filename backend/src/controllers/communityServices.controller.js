import serviceService from "../services/communityServices.service.js";

// Create service
export const createService = async (req, res) => {
  try {
    const service = await serviceService.create({
      community_post_id: req.params.communityId,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });

    res.status(201).json({
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get services of community
export const getServicesByCommunity = async (req, res) => {
  try {
    const services = await serviceService.getByCommunity(
      req.params.communityId,
    );

    res.status(200).json({
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const updatedService = await serviceService.update(
      req.params.serviceId,
      req.body,
    );

    res.status(200).json({
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    await serviceService.remove(req.params.serviceId);

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
