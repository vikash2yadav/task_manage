import { Income } from "../models/incomes.js";

const getList = async (req, res, next) => {
  const { id } = req?.params;

  const income = await Income.find();

  res.status(200).json({
    success: true,
    income,
  });
};

export { getList };
