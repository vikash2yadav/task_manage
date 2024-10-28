import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
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

const Dashboard = () => {
  const { type, setType, data } = useContext(CommonContext);
  const { getAllIncomes } = useContext(IncomeContext);
  const { getAllSavings } = useContext(SavingContext);
  const { getAllExpenses } = useContext(ExpenseContext);

  const callApi = async () => {
    if (type === "expenses") {
      await getAllExpenses();
      setType("expenses");
    } else if (type === "savings") {
      await getAllSavings();
      setType("savings");
    } else {
      await getAllIncomes();
    }
  };

  useEffect(() => {
    callApi();
  }, [type]);

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
        type="income"
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
              height: "28rem",
              overflowY: "auto",
            }}
          >
            <Typography
              margin={"2rem 1rem"}
              variant="h4"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              {type === "income"
                ? "Incomes"
                : type === "savings"
                ? "Savings"
                : type === "expenses"
                ? "Expenses"
                : ""}
              <Button
                variant="contained"
                sx={{ minWidth: "6rem", borderRadius: "1rem" }}
              >
                Add
              </Button>
            </Typography>

            <Lists data={data} />
          </Paper>
          <Paginations />
        </Stack>
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
