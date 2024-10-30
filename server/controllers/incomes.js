import { Income } from "../models/incomes.js";

const addIncome = async (req, res, next) => {
  const { title, description, amount } = req?.body;

  let income = await Income.create({
    title,
    description,
    amount,
  });

  res.status(200).json({
    success: true,
    income,
    message: "Income Added Successfully",
  });
};

const updateIncome = async (req, res, next) => {
  const { _id, title, description, amount } = req.body;

  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      _id,
      { title, description, amount },
      { new: true, runValidators: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res
      .status(200)
      .json({ message: "Income updated successfully", updatedIncome });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating income", error });
  }
};

const deleteIncome = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedIncome = await Income.findByIdAndDelete(id);

    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting income", error });
  }
};

const getIncomeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    let data = await Income.findById(id);

    return res.status(200).json({
      data,
      message: "Income Found",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while geting income", error });
  }
};

const getList = async (req, res, next) => {
  const { id } = req?.params;

  const income = await Income.find();

  res.status(200).json({
    success: true,
    income,
  });
};

export { addIncome, updateIncome, deleteIncome, getIncomeById, getList };
