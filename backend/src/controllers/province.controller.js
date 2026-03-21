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
    await provinceService.remove(req.params.id);

    res.status(200).json({ message: "Province deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllProvinces = async (req, res) => {
  try {
    const provinces = await provinceService.getAll();
    res.status(200).json(provinces);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const searchProvinces = async (req, res) => {
  try {
    const { query } = req.query;
    const provinces = await provinceService.search(query);
    res.status(200).json(provinces);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateProvince = async (req, res) => {
  try {
    const province = await provinceService.update(req.params.id, req.body);

    res.status(200).json(province);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
