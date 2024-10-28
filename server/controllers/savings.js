import { Saving } from "../models/savings.js";

const getList = async (req, res, next) => {
    
  const saving = await Saving.find();

  res.status(200).json({
    success: true,
    saving,
  });
};

export { getList };
