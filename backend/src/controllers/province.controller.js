import provinceService from "../services/province.service.js";

export const createProvince = async (req, res) => {
  try {
    const province = await provinceService.create(req.body);

    res.status(201).json({
      message: "Province created successfully",
      data: province,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeProvince = async (req, res) => {
  try {
    await provinceService.remove(req.body);

    res.status(200).json({
      message: "Province removed successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
