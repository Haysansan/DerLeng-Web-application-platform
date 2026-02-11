import Province from "../models/Province.js";

const create = async ({ name }) => {
  const province = await Province.findOne({ province_name: name });

  if (province) {
    throw new Error("Province already exists");
  }

  return await Province.create({ province_name: name });
};

const remove = async ({ name }) => {
  const province = await Province.findOne({ province_name: name });

  if (!province) {
    throw new Error("Province not exist");
  }

  await Province.deleteOne({ province_name: name });
};

export default { create, remove };
