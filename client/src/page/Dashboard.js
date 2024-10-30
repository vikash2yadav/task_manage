import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Notifications as NotificationsIcon,
  CurrencyRupee as CurrencyRupeeIcon,
} from "@mui/icons-material";
import moment from "moment";
import Lists from "../components/Lists";
import Paginations from "../components/Paginations";
import { useContext, useEffect } from "react";
import { CommonContext } from "../context/CommonContext";
import { IncomeContext } from "../context/IncomeContext";
import { ExpenseContext } from "../context/ExpenseContext";
import { SavingContext } from "../context/SavingContext";
import Loader from "../components/Loader";
import { useFormik } from "formik";
import { initialValue, schemaValue } from "./Schema";
import {
  addIncomeApi,
  getIncomeByIdApi,
  updateIncomeApi,
  deleteIncomeApi,
} from "../apis/incomes";
import { toast } from "react-hot-toast";
import {
  addExpenseApi,
  getExpenseByIdApi,
  updateExpenseApi,
  deleteExpenseApi,
} from "../apis/expenses";
import {
  addSavingApi,
  deleteSavingApi,
  getSavingByIdApi,
  updateSavingApi,
} from "../apis/savings";
import Swal from "sweetalert2";

const Dashboard = () => {
  const {
    type,
    setType,
    data,
    loading,
    setLoading,
    open,
    setOpen,
    isFormEdit,
    setIsFormEdit,
  } = useContext(CommonContext);
  const { getAllIncomes } = useContext(IncomeContext);
  const { getAllSavings } = useContext(SavingContext);
  const { getAllExpenses } = useContext(ExpenseContext);

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schemaValue,
    onSubmit: async (values) => {
      let response;

      if (open && !isFormEdit) {
        if (type === "incomes") {
          response = await addIncomeApi("income/add", values);
          await getAllIncomes();
          setType("incomes");
        } else if (type === "expenses") {
          response = await addExpenseApi("expense/add", values);
          await getAllExpenses();
          setType("expenses");
        } else if (type === "savings") {
          response = await addSavingApi("saving/add", values);
          await getAllSavings();
          setType("savings");
        } else {
        }
      } else {
        if (type === "incomes") {
          response = await updateIncomeApi("income/update", values);
          await getAllIncomes();
          setType("incomes");
        } else if (type === "expenses") {
          response = await updateExpenseApi("expense/update", values);
          await getAllExpenses();
          setType("expenses");
        } else if (type === "savings") {
          response = await updateSavingApi("saving/update", values);
          await getAllSavings();
          setType("savings");
        } else {
        }
      }

      if (response.status === 200) {
        toast.success(response?.data?.message);
        setOpen(false);
        setIsFormEdit(false);
        formik.setValues("");
      } else {
        toast.error(response?.data?.message);
      }
    },
  });

  const setEditFeildValues = (editData) => {
    formik.setValues(editData);
  };

  const handleEditOpen = async (id) => {
    setIsFormEdit(true);
    setOpen(true);

    let response;

    if (type === "incomes") {
      response = await getIncomeByIdApi(`income/get/${id}`);
      await getAllIncomes();
    } else if (type === "expenses") {
      response = await getExpenseByIdApi(`expense/get/${id}`);
      await getAllExpenses();
    } else if (type === "savings") {
      response = await getSavingByIdApi(`saving/get/${id}`);
      await getAllSavings();
    } else {
    }

    if (response.status === 200) {
      const editedData = response?.data?.data;
      setEditFeildValues(editedData);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      let response;

      if (type === "incomes") {
        response = await deleteIncomeApi(`income/delete/${id}`);
        await getAllIncomes();
      } else if (type === "expenses") {
        response = await deleteExpenseApi(`expense/delete/${id}`);
        await getAllExpenses();
      } else if (type === "savings") {
        response = await deleteSavingApi(`saving/delete/${id}`);
        await getAllSavings();
      }

      if (response.status === 200) {
        toast.success(response?.data?.message);
      } else {
        toast.error("Failed to delete the item.");
      }
    }
  };

  const callApi = async () => {
    setLoading(true);
    try {
      if (type === "expenses") {
        await getAllExpenses();
        setType("expenses");
      } else if (type === "savings") {
        await getAllSavings();
        setType("savings");
      } else if (type === "incomes") {
        await getAllIncomes();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callApi();
  }, [type, setType]);

  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />

        <Box flexGrow={1}></Box>
        <Typography
          display={{ xs: "none", lg: "block" }}
          color="rgba(0,0,0,0.7)"
          textAlign={"center"}
        >
          {" "}
          {moment().format("MMMM Do YYYY")}{" "}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget
        type="incomes"
        setType={setType}
        title="Incomes"
        value={34}
        icon={<CurrencyRupeeIcon />}
      />
      <Widget
        type="expenses"
        setType={setType}
        title="Expenses"
        value={4}
        icon={<CurrencyRupeeIcon />}
      />
      <Widget
        type="savings"
        setType={setType}
        title="Savings"
        value={324}
        icon={<CurrencyRupeeIcon />}
      />
    </Stack>
  );

  return (
    <>
      <Container component={"main"}>
        {Appbar}
        {open ? (
          <>
            <Stack
              direction={{
                xs: "column",
                lg: "row",
              }}
              flexWrap={"wrap"}
              justifyContent={"center"}
              alignItems={{
                xs: "center",
                lg: "stretch",
              }}
              sx={{ gap: "2rem", marginBottom: "6rem" }}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: {
                    lg: "2rem 3.5rem",
                  },
                  borderRadius: "1rem",
                  width: "100%",
                  minWidth: "28rem",
                }}
              >
                <Typography margin={"2rem 0rem"} variant="h4">
                  {type === "incomes"
                    ? isFormEdit
                      ? "Update Income"
                      : "Add Income"
                    : type === "savings"
                    ? isFormEdit
                      ? "Update Saving"
                      : "Add Saving"
                    : type === "expenses"
                    ? isFormEdit
                      ? "Update Expense"
                      : "Add Expense"
                    : "Add"}
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                  <Box sx={{ marginBottom: "2rem" }}>
                    <TextField
                      sx={{ width: "100%" }}
                      id="standard-basic"
                      label="Title"
                      variant="standard"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title}
                    />
                  </Box>

                  <Box sx={{ marginBottom: "2rem" }}>
                    <TextField
                      sx={{ width: "100%" }}
                      id="standard-basic"
                      label="Description"
                      variant="standard"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />
                  </Box>

                  <Box sx={{ marginBottom: "2rem" }}>
                    <TextField
                      sx={{ width: "100%" }}
                      id="standard-basic"
                      label="Amount"
                      variant="standard"
                      name="amount"
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.amount && Boolean(formik.errors.amount)
                      }
                      helperText={formik.touched.amount && formik.errors.amount}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "4rem",
                      gap: "2rem",
                    }}
                  >
                    <Button
                      variant="outlined"
                      type="button"
                      sx={{
                        minWidth: "10rem",
                        borderRadius: "0.5rem",
                      }}
                      onClick={() => {
                        setOpen(false);
                        setIsFormEdit(false);
                        formik.setValues("");
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        minWidth: "10rem",
                        borderRadius: "0.5rem",
                      }}
                    >
                      {isFormEdit ? "Update" : "Add"}
                    </Button>
                  </Box>
                </form>
              </Paper>
            </Stack>
          </>
        ) : (
          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={{
              xs: "center",
              lg: "stretch",
            }}
            sx={{ gap: "2rem", marginBottom: "6rem" }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: {
                  lg: "2rem 3.5rem",
                },
                borderRadius: "1rem",
                width: "100%",
                height: "25rem",
                overflowY: "auto",
              }}
            >
              <Typography
                margin={"2rem 1rem"}
                variant="h4"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                {type === "incomes"
                  ? "Incomes"
                  : type === "savings"
                  ? "Savings"
                  : type === "expenses"
                  ? "Expenses"
                  : ""}
                <Button
                  variant="contained"
                  sx={{ minWidth: "6rem", borderRadius: "1rem" }}
                  onClick={() => setOpen(true)}
                >
                  Add
                </Button>
              </Typography>
              {loading ? (
                <Loader />
              ) : (
                <Lists
                  handleEditOpen={handleEditOpen}
                  handleDelete={handleDelete}
                  data={data}
                />
              )}
            </Paper>
            <Paginations />
          </Stack>
        )}
        {widgets}
      </Container>
    </>
  );
};

const Widget = ({ type, setType, title, value, icon }) => (
  <Paper
    onClick={() => setType(type)}
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: {
        xs: "14rem",
        sm: "20rem",
      },
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.05)",
        boxShadow: 6,
      },
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        color="rgba(0,0,0,0.7)"
        borderRadius={"50%"}
        border={`5px solid ${"  "}`}
        width={"5rem"}
        height={"5rem"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
