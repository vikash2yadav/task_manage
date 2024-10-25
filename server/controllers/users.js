import { sendToken } from "../dotenv/features.js";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/users.js";
import { ErrorHandler } from "../dotenv/utility.js";
import { compare } from "bcrypt";

const newUser = async (req, res) => {
  const { name, email, password } = req.body;

  //   const file = req.file;

  //   if (!file) return next(new ErrorHandler("Please Upload Avatar"));

  //   const avatar = {
  //     public_id: "ssd",
  //     url: "asds",
  //   };

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(res, user, 201, "User Created");
};

const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid email or Password", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return next(new ErrorHandler("Invalid email or Password", 404));

  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user) return next(new ErrorHandler("User not found", 404));

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

export {
  login,
  newUser,
  getMyProfile,
  logout,
};
