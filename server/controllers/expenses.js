import { Expense } from "../models/expenses.js";

const addExpense = async (req, res, next) => {
  const { title, description, amount } = req?.body;

  let expense = await Expense.create({
    title,
    description,
    amount,
  });

  res.status(200).json({
    success: true,
    expense,
    message: "Expense Added Successfully",
  });
};

const updateExpense = async (req, res, next) => {
  const { _id, title, description, amount } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      _id,
      { title, description, amount },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res
      .status(200)
      .json({ message: "Expense updated successfully", updatedExpense });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating Expense", error });
  }
};

const deleteExpense = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting Expense", error });
  }
};

const getExpenseById = async (req, res, next) => {
  const { id } = req.params;
  try {
    let data = await Expense.findById(id);

    return res.status(200).json({
      data,
      message: "Expense Found",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while geting Expense", error });
  }
};

const getList = async (req, res, next) => {
  const expense = await Expense.find();

  res.status(200).json({
    success: true,
    expense,
  });
};

export { addExpense, updateExpense, deleteExpense, getExpenseById, getList };
