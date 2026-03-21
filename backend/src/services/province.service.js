import Province from "../models/Province.js";

const create = async ({ name }) => {
  const province = await Province.findOne({ province_name: name });

  if (province) {
    throw new Error("Province already exists");
  }

  return await Province.create({ province_name: name });
};

const remove = async (id) => {
  const province = await Province.findById(id);

  if (!province) {
    throw new Error("Province not found");
  }

  await Province.findByIdAndDelete(id);
};

const getAll = async () => {
  return await Province.find().sort({ province_name: 1 });
};

const search = async (query) => {
  if (!query || !query.trim()) {
    return await getAll();
  }

  // Case-insensitive partial/fuzzy matching
  const searchRegex = new RegExp(query.trim(), "i");
  return await Province.find({ province_name: searchRegex }).sort({
    province_name: 1,
  });
};

const update = async (id, { name }) => {
  const province = await Province.findById(id);

  if (!province) {
    throw new Error("Province not found");
  }

  province.province_name = name;

  return await province.save();
};

export default { create, getAll, search, update, remove };
