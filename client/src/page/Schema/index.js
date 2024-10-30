import * as Yup from "yup";

export const initialValue = {
  title: "",
  description: "",
  amount: "",
};

export const schemaValue = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(10, "Title should be minimum 10 characters long"),
  description: Yup.string()
    .required("Description is required")
    .min(20, "Description should be minimum 20 characters long"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .min(1, "Amount must be at least 1"),
});
