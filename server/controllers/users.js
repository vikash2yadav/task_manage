import { sendToken } from "../dotenv/features.js";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/users.js";
import { ErrorHandler } from "../dotenv/utility.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { UserToken } from "../models/users_token.js";
import { Saving } from "../models/savings.js";
import { Expense } from "../models/expenses.js";
import { Income } from "../models/incomes.js";
import { sendOtpEmail } from "../utils/mailer.js";

const newUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(404).json({
      message: "Please enter name",
    });
  }
  if (!email) {
    return res.status(404).json({
      message: "Please enter email",
    });
  }
  if (!password) {
    return res.status(404).json({
      message: "Please enter password",
    });
  }
  const existUser = await User.findOne({ email });

  if (existUser) return res.status(208).json({
    success: false,
    message: 'This Email is already registered',
  });

  //   const file = req.file;

  //   if (!file) return next(new ErrorHandler("Please Upload Avatar"));

  //   const avatar = {
  //     public_id: "ssd",
  //     url: "a",
  //   };

  const hashedPassword = await hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    status: 1,
  });

  sendToken(res, user, 200, "Account Created Successfully");
};

const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // if (!user) return next(new ErrorHandler("Invalid email", 404));
  if (!email) return res.status(200).json({
    success: false,
    message: 'Please enter email',
  });

  if (!password) return res.status(200).json({
    success: false,
    message: 'Please enter password',
  });

  if (!user) return res.status(200).json({
    success: false,
    message: 'Email is not registered',
  });

  const isMatch = await compare(password, user.password);

  // if (!isMatch) return next(new ErrorHandler("Invalid Password", 404));
  if (!isMatch) return res.status(200).json({
    success: false,
    message: 'Invalid password or email',
  });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  await UserToken.create({
    token,
    user_id: user?._id,
    status: 1,
  });

  sendToken(res, user, 200, `You have login successfully, ${user?.name}`, token);
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user) return next(new ErrorHandler("Account not found", 404));

  res.status(200).json({
    success: true,
    user,
  });
});

const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logout successfully",
    });
});

const getCount = TryCatch(async (req, res) => {
  const userId = req.user._id;

  const [incomeCount, expenseCount, savingCount] = await Promise.all([
    Income.countDocuments({ user_id: userId }),
    Expense.countDocuments({ user_id: userId }),
    Saving.countDocuments({ user_id: userId }),
  ]);

  return res.status(200).json({
    success: true,
    data: {
      income: incomeCount,
      expense: expenseCount,
      saving: savingCount,
    },
    message: "Counts fetched successfully",
  });;
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


const sentOtp = TryCatch(async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  sendOtpEmail(email, otp);
  
  return res.status(200).json({
    success: true,
    data: otp,
    message: "Otp sent succesfully ...........",
  });;
});

const changePassword = TryCatch(async (req, res) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;

  if (!email || !oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "New password and confirm password do not match.",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  const isMatch = await compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Old password is incorrect.",
    });
  }

  const hashedPassword = await hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password updated successfully.",
  });
});

export { login, newUser, getMyProfile, logout, getCount, sentOtp, changePassword };

