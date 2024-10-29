import { Saving } from "../models/savings.js";

const addSaving = async (req, res, next) => {
  const { title, description, amount } = req?.body;

  let saving = await Saving.create({
    title,
    description,
    amount,
  });

  res.status(200).json({
    success: true,
    saving,
    message: "Saving Added Successfully",
  });
};

const updateSaving = async (req, res, next) => {
  const { _id, title, description, amount } = req.body;

  try {
    const updatedSaving = await Saving.findByIdAndUpdate(
      _id,
      { title, description, amount },
      { new: true, runValidators: true }
    );

    if (!updatedSaving) {
      return res.status(404).json({ message: "Saving not found" });
    }

    res
      .status(200)
      .json({ message: "Saving updated successfully", updatedSaving });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating Saving", error });
  }
};

const deleteSaving = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedSaving = await Saving.findByIdAndDelete(id);

    if (!deletedSaving) {
      return res.status(404).json({ message: "Saving not found" });
    }

    res.status(200).json({ message: "Saving deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting Saving", error });
  }
};

const getSavingById = async (req, res, next) => {
  const { id } = req.params;
  try {
    let data = await Saving.findById(id);

    return res.status(200).json({
      data,
      message: "Saving Found",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while geting Saving", error });
  }
};

const getList = async (req, res, next) => {
  const saving = await Saving.find();

  res.status(200).json({
    success: true,
    saving,
  });
};

export { addSaving, updateSaving, deleteSaving, getSavingById, getList };
