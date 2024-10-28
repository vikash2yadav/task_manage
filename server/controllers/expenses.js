import { Expense } from "../models/expenses.js";

const getList = async (req, res, next) => {
    
  const expense = await Expense.find();

  res.status(200).json({
    success: true,
    expense,
  });
};

export { getList };
